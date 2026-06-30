import { NextRequest, NextResponse } from 'next/server'

/**
 * ============================================
 * API ROUTE - CAPTURA DE LEADS
 * ============================================
 *
 * Esta rota é responsável por:
 * 1. Receber dados do formulário de captura
 * 2. Enviar para o ActiveCampaign via API
 * 3. Criar/atualizar contato
 * 4. Adicionar à lista
 * 5. Aplicar tag
 * 6. Salvar campos personalizados
 *
 * SEGURANÇA:
 * - A API Key do ActiveCampaign NUNCA é exposta ao front-end
 * - Todas as variáveis de ambiente são Server-side only
 */

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

// ==========================================
// VERIFICAÇÃO DE CONFIGURAÇÃO
// ==========================================

function isActiveCampaignConfigured(): boolean {
  const url = process.env.ACTIVE_CAMPAIGN_URL
  const key = process.env.ACTIVE_CAMPAIGN_API_KEY
  return !!(url && key && url !== 'undefined' && key !== 'undefined')
}

// ==========================================
// FUNÇÕES DE API DO ACTIVE CAMPAIGN
// ==========================================

/**
 * Sincroniza/Cria um contato no ActiveCampaign
 * Estrategia: tenta sync primeiro, se der duplicate, atualiza via PUT
 */
async function syncContact(data: LeadData): Promise<{ id: number } | null> {
  const acUrl = process.env.ACTIVE_CAMPAIGN_URL!
  const acKey = process.env.ACTIVE_CAMPAIGN_API_KEY!

  const phoneDigits = data.phone.replace(/\D/g, '')
  const firstName = data.name.split(' ')[0]
  const lastName = data.name.split(' ').slice(1).join(' ') || ''

  // 1. Tenta sync primeiro (cria ou atualiza)
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

  // Sucesso - retorna ID
  if (syncResponse.ok) {
    const result = await syncResponse.json()
    return { id: result.contact?.id }
  }

  // 2. Se der duplicate, tenta atualizar via PUT no contato existente
  if (syncResponse.status === 422 || syncResponse.status === 400) {
    const errorText = await syncResponse.text()

    if (errorText.includes('duplicate') || errorText.includes('já existe')) {
      console.log(`[SYNC] Email ${data.email} ja existe, tentando atualizar via PUT`)

      // Busca o contato existente
      const searchResponse = await fetch(
        `${acUrl}/api/3/contacts?email=${encodeURIComponent(data.email)}`,
        { headers: { 'Api-Token': acKey } }
      )

      if (!searchResponse.ok) {
        console.error('[SYNC] Erro ao buscar contato existente')
        return null
      }

      const searchResult = await searchResponse.json()
      const existingContact = searchResult.contacts?.[0]

      if (!existingContact) {
        console.error('[SYNC] Contato nao encontrado apos duplicate')
        return null
      }

      // Atualiza via PUT
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
              bounced_hard: '0', // Reseta status de bounce
            },
          }),
        }
      )

      if (updateResponse.ok) {
        console.log(`[SYNC] Contato ${existingContact.id} atualizado com sucesso`)
        return { id: parseInt(existingContact.id) }
      }

      const updateError = await updateResponse.text()
      console.error(`[SYNC] Erro ao atualizar contato: ${updateError}`)
      return null
    }

    // Outro tipo de erro 422
    console.error(`[SYNC] Erro 422: ${errorText}`)
    return null
  }

  // 3. Outros erros
  const error = await syncResponse.text()
  console.error(`[SYNC] Erro ${syncResponse.status}: ${error}`)
  return null
}

/**
 * Adiciona o contato a uma lista
 */
async function addToList(contactId: number): Promise<boolean> {
  const listId = process.env.ACTIVE_CAMPAIGN_LIST_ID

  if (!listId || listId === 'undefined') {
    console.log('[LIST] ACTIVE_CAMPAIGN_LIST_ID nao configurado - pulando')
    return true
  }

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

  // Se ja estiver na lista, considera sucesso
  if (response.ok || response.status === 422) {
    return true
  }

  const errorText = await response.text()
  console.error(`[LIST] Erro ao adicionar contato ${contactId} na lista: ${errorText}`)
  return false
}

/**
 * Aplica uma tag ao contato
 */
async function applyTag(contactId: number): Promise<boolean> {
  const tagId = process.env.ACTIVE_CAMPAIGN_TAG_ID

  if (!tagId || tagId === 'undefined') {
    console.log('[TAG] ACTIVE_CAMPAIGN_TAG_ID nao configurado - pulando')
    return true
  }

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

  // Se ja tiver a tag, considera sucesso
  if (response.ok || response.status === 422) {
    return true
  }

  const errorText = await response.text()
  console.error(`[TAG] Erro ao aplicar tag no contato ${contactId}: ${errorText}`)
  return false
}

// ==========================================
// SALVAR CAMPO CUSTOMIZADO
// ==========================================

async function saveSingleField(
  acUrl: string,
  acKey: string,
  contactId: number,
  fieldName: string,
  value: string
): Promise<boolean> {
  if (!value) {
    console.log(`[FIELD] Pulando ${fieldName} (valor vazio)`)
    return false
  }

  try {
    // Busca o field ID pelo nome
    const fieldResponse = await fetch(
      `${acUrl}/api/3/fields?search=${encodeURIComponent(fieldName)}`,
      {
        headers: { 'Api-Token': acKey },
      }
    )

    if (!fieldResponse.ok) {
      console.error(`[FIELD] Erro ao buscar campo ${fieldName}: status ${fieldResponse.status}`)
      return false
    }

    const fieldResult = await fieldResponse.json()
    const fields = fieldResult.fields || []

    // Procura match exato pelo titulo (case-insensitive)
    const exactMatch = fields.find(
      (f: any) => f.title?.toLowerCase() === fieldName.toLowerCase()
    )

    const matchedField = exactMatch || fields[0]
    const fieldId = matchedField?.id

    if (!fieldId) {
      console.error(`[FIELD] Campo '${fieldName}' NAO ENCONTRADO no AC. Campos disponiveis:`, fields.map((f: any) => f.title))
      return false
    }

    console.log(`[FIELD] Salvando ${fieldName} (ID ${fieldId}) = "${value}" no contato ${contactId}`)

    // Atualiza o campo
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

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text()
      console.error(`[FIELD] Erro ao salvar ${fieldName}: status ${updateResponse.status} - ${errorText}`)
      return false
    }

    console.log(`[FIELD] OK ${fieldName} salvo`)
    return true
  } catch (error) {
    console.error(`[FIELD] Excecao ao salvar ${fieldName}:`, error)
    return false
  }
}

/**
 * Salva campos personalizados
 */
async function saveCustomFields(
  contactId: number,
  data: LeadData
): Promise<boolean> {
  const acUrl = process.env.ACTIVE_CAMPAIGN_URL!
  const acKey = process.env.ACTIVE_CAMPAIGN_API_KEY!

  const fieldScore = process.env.AC_FIELD_SCORE || 'quiz_score'
  const fieldLevel = process.env.AC_FIELD_LEVEL || 'quiz_level'
  const fieldAnswers = process.env.AC_FIELD_ANSWERS || 'answers'

  // Garante que utms sempre exista, mesmo se vier undefined
  const utms = data.utms || {}

  // Campos personalizados a serem salvos
  const customFields: Array<{ name: string; value: string }> = [
    { name: fieldScore, value: String(data.score) },
    { name: fieldLevel, value: data.level },
    { name: 'date_lead', value: new Date().toISOString() },
    // UTMs
    { name: `${fieldAnswers}_source`, value: utms.utm_source || '' },
    { name: `${fieldAnswers}_medium`, value: utms.utm_medium || '' },
    { name: `${fieldAnswers}_campaign`, value: utms.utm_campaign || '' },
    { name: `${fieldAnswers}_content`, value: utms.utm_content || '' },
    { name: `${fieldAnswers}_term`, value: utms.utm_term || '' },
  ]

  // Salva todos os campos em paralelo (mas loga falhas individuais)
  const results = await Promise.allSettled(
    customFields.map((field) =>
      saveSingleField(acUrl, acKey, contactId, field.name, field.value)
    )
  )

  const successCount = results.filter(
    (r) => r.status === 'fulfilled' && r.value === true
  ).length

  console.log(
    `Campos salvos: ${successCount}/${customFields.length} para contato ${contactId}`
  )

  return true
}

// ==========================================
// HANDLER DA ROTA
// ==========================================

export async function POST(request: NextRequest) {
  try {
    // Parse do body
    const data: LeadData = await request.json()

    // Validação básica
    if (!data.email || !data.name) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      )
    }

    // Log para desenvolvimento
    console.log('Lead recebido:', {
      name: data.name,
      email: data.email,
      score: data.score,
      level: data.level,
      utms: data.utms,
    })

    // Verifica se o ActiveCampaign está configurado
    if (!isActiveCampaignConfigured()) {
      console.warn('='.repeat(50))
      console.warn('⚠️  ATENÇÃO: ActiveCampaign não configurado')
      console.warn('   Para configurar, defina as variáveis de ambiente:')
      console.warn('   - ACTIVE_CAMPAIGN_URL')
      console.warn('   - ACTIVE_CAMPAIGN_API_KEY')
      console.warn('   - ACTIVE_CAMPAIGN_LIST_ID (opcional)')
      console.warn('   - ACTIVE_CAMPAIGN_TAG_ID (opcional)')
      console.warn('='.repeat(50))

      // Em desenvolvimento, retorna sucesso mesmo sem AC
      return NextResponse.json({
        success: true,
        mode: 'development',
        message: 'Lead processado em modo desenvolvimento (sem ActiveCampaign)',
        lead: {
          name: data.name,
          email: data.email,
          score: data.score,
          level: data.level,
        },
      })
    }

    // Sincroniza contato no ActiveCampaign
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

    // Operacoes em paralelo para melhor performance
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

// Método não permitido
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  )
}
