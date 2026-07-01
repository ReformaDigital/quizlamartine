import { NextRequest, NextResponse } from 'next/server'

interface LeadData {
  name: string
  email: string
  phone: string
  score: number
  level: string
  utms: {
    utm_source?: string | null
    utm_medium?: string | null
    utm_campaign?: string | null
    utm_content?: string | null
    utm_term?: string | null
  }
}

function isActiveCampaignConfigured(): boolean {
  const url = process.env.ACTIVE_CAMPAIGN_URL
  const key = process.env.ACTIVE_CAMPAIGN_API_KEY
  return !!(url && key && url !== 'undefined' && key !== 'undefined')
}

async function syncContact(data: LeadData): Promise<{ id: number } | null> {
  const acUrl = process.env.ACTIVE_CAMPAIGN_URL!
  const acKey = process.env.ACTIVE_CAMPAIGN_API_KEY!

  const phoneDigits = data.phone.replace(/\D/g, '')
  const firstName = data.name.split(' ')[0]
  const lastName = data.name.split(' ').slice(1).join(' ') || ''

  const syncResponse = await fetch(`${acUrl}/api/3/contacts/sync`, {
    method: 'POST',
    headers: {
      'Api-Token': acKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact: {
        email: data.email,
        firstName,
        lastName,
        phone: phoneDigits,
      },
    }),
  })

  if (syncResponse.ok) {
    const result = await syncResponse.json()
    return { id: result.contact?.id }
  }

  // Se der duplicate, busca o contato existente e atualiza via PUT
  if (syncResponse.status === 422 || syncResponse.status === 400) {
    const errorText = await syncResponse.text()

    if (errorText.includes('duplicate') || errorText.includes('já existe')) {
      const searchResponse = await fetch(
        `${acUrl}/api/3/contacts?email=${encodeURIComponent(data.email)}`,
        { headers: { 'Api-Token': acKey } }
      )

      if (!searchResponse.ok) return null

      const searchResult = await searchResponse.json()
      const existingContact = searchResult.contacts?.[0]

      if (!existingContact) return null

      const updateResponse = await fetch(
        `${acUrl}/api/3/contacts/${existingContact.id}`,
        {
          method: 'PUT',
          headers: {
            'Api-Token': acKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contact: {
              firstName,
              lastName,
              phone: phoneDigits,
              bounced_hard: '0',
            },
          }),
        }
      )

      if (updateResponse.ok) {
        return { id: parseInt(existingContact.id) }
      }

      console.error('Erro ao atualizar contato existente:', await updateResponse.text())
      return null
    }
  }

  console.error('ActiveCampaign sync error:', await syncResponse.text())
  return null
}

async function addToList(contactId: number): Promise<boolean> {
  const listId = process.env.ACTIVE_CAMPAIGN_LIST_ID

  if (!listId || listId === 'undefined') return true

  const acUrl = process.env.ACTIVE_CAMPAIGN_URL!
  const acKey = process.env.ACTIVE_CAMPAIGN_API_KEY!

  const response = await fetch(`${acUrl}/api/3/contactLists`, {
    method: 'POST',
    headers: {
      'Api-Token': acKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contactList: {
        list: listId,
        contact: contactId,
        status: '1',
      },
    }),
  })

  // 422 = ja esta na lista
  return response.ok || response.status === 422
}

async function applyTag(contactId: number): Promise<boolean> {
  const tagId = process.env.ACTIVE_CAMPAIGN_TAG_ID

  if (!tagId || tagId === 'undefined') return true

  const acUrl = process.env.ACTIVE_CAMPAIGN_URL!
  const acKey = process.env.ACTIVE_CAMPAIGN_API_KEY!

  const response = await fetch(`${acUrl}/api/3/contactTags`, {
    method: 'POST',
    headers: {
      'Api-Token': acKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contactTag: {
        contact: contactId,
        tag: tagId,
      },
    }),
  })

  // 422 = ja tem a tag
  return response.ok || response.status === 422
}

async function saveSingleField(
  acUrl: string,
  acKey: string,
  contactId: number,
  fieldName: string,
  value: string
): Promise<boolean> {
  if (!value) return false

  try {
    const fieldResponse = await fetch(
      `${acUrl}/api/3/fields?search=${encodeURIComponent(fieldName)}`,
      { headers: { 'Api-Token': acKey } }
    )

    if (!fieldResponse.ok) return false

    const fieldResult = await fieldResponse.json()
    const fields = fieldResult.fields || []

    // Match exato pelo titulo (case-insensitive) para evitar pegar campo errado
    const exactMatch = fields.find(
      (f: any) => f.title?.toLowerCase() === fieldName.toLowerCase()
    )
    const fieldId = (exactMatch || fields[0])?.id

    if (!fieldId) return false

    const updateResponse = await fetch(`${acUrl}/api/3/fieldValues`, {
      method: 'POST',
      headers: {
        'Api-Token': acKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fieldValue: {
          field: String(fieldId),
          contact: String(contactId),
          value: String(value),
        },
      }),
    })

    return updateResponse.ok
  } catch {
    return false
  }
}

async function saveCustomFields(contactId: number, data: LeadData): Promise<void> {
  const acUrl = process.env.ACTIVE_CAMPAIGN_URL!
  const acKey = process.env.ACTIVE_CAMPAIGN_API_KEY!

  const fieldScore = process.env.AC_FIELD_SCORE || 'quiz_score'
  const fieldLevel = process.env.AC_FIELD_LEVEL || 'quiz_level'
  const fieldAnswers = process.env.AC_FIELD_ANSWERS || 'answers'
  const utms = data.utms || {}

  const customFields = [
    { name: fieldScore, value: String(data.score) },
    { name: fieldLevel, value: data.level },
    { name: 'date_lead', value: new Date().toISOString() },
    { name: `${fieldAnswers}_source`, value: utms.utm_source || '' },
    { name: `${fieldAnswers}_medium`, value: utms.utm_medium || '' },
    { name: `${fieldAnswers}_campaign`, value: utms.utm_campaign || '' },
    { name: `${fieldAnswers}_content`, value: utms.utm_content || '' },
    { name: `${fieldAnswers}_term`, value: utms.utm_term || '' },
  ]

  await Promise.allSettled(
    customFields.map((field) =>
      saveSingleField(acUrl, acKey, contactId, field.name, field.value)
    )
  )
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json()

    if (!data.email || !data.name) {
      return NextResponse.json(
        { success: false, error: 'Nome e email são obrigatórios' },
        { status: 400 }
      )
    }

    if (!isActiveCampaignConfigured()) {
      return NextResponse.json({
        success: true,
        mode: 'development',
        message: 'Lead processado em modo desenvolvimento',
      })
    }

    const contact = await syncContact(data)

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          error: 'Erro ao processar lead no ActiveCampaign. Verifique os dados e tente novamente.',
        },
        { status: 500 }
      )
    }

    await Promise.all([
      addToList(contact.id),
      applyTag(contact.id),
      saveCustomFields(contact.id, data),
    ])

    return NextResponse.json({
      success: true,
      message: 'Lead salvo com sucesso',
      contactId: contact.id,
    })
  } catch (error) {
    console.error('Erro na API /api/lead:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor. Tente novamente em alguns instantes.',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  )
}
