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
 */
async function syncContact(data: LeadData): Promise<{ id: number } | null> {
  const acUrl = process.env.ACTIVE_CAMPAIGN_URL!
  const acKey = process.env.ACTIVE_CAMPAIGN_API_KEY!

  // AC aceita telefone em varios formatos, mas o mais seguro é enviar
  // apenas dígitos (sem mascara) ou em formato E.164
  const phoneDigits = data.phone.replace(/\D/g, '')

  const response = await fetch(`${acUrl}/api/3/contacts/sync`, {
    method: 'POST',
    headers: {
      'Api-Token': acKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact: {
        email: data.email,
        firstName: data.name.split(' ')[0],
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        phone: phoneDigits,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('ActiveCampaign sync error:', error)
    console.error('Status:', response.status, '| Email:', data.email, '| Phone:', phoneDigits)
    return null
  }

  const result = await response.json()
  return { id: result.contact?.id }
}

/**
 * Adiciona o contato a uma lista
 */
async function addToList(contactId: number): Promise<boolean> {
  const listId = process.env.ACTIVE_CAMPAIGN_LIST_ID

  if (!listId || listId === 'undefined') {
    console.log('ACTIVE_CAMPAIGN_LIST_ID não configurado - pulando adição à lista')
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
        status: '1', // 1 = ativo
      },
    }),
  })

  return response.ok
}

/**
 * Aplica uma tag ao contato
 */
async function applyTag(contactId: number): Promise<boolean> {
  const tagId = process.env.ACTIVE_CAMPAIGN_TAG_ID

  if (!tagId || tagId === 'undefined') {
    console.log('ACTIVE_CAMPAIGN_TAG_ID não configurado - pulando aplicação de tag')
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

  return response.ok
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
  if (!value) return false

  try {
    // Busca o field ID pelo nome
    const fieldResponse = await fetch(
      `${acUrl}/api/3/fields?search=${encodeURIComponent(fieldName)}`,
      {
        headers: { 'Api-Token': acKey },
      }
    )

    if (!fieldResponse.ok) return false

    const fieldResult = await fieldResponse.json()
    const fieldId = fieldResult.fields?.[0]?.id

    if (!fieldId) {
      console.warn(`Campo customizado nao encontrado: ${fieldName}`)
      return false
    }

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
      console.error(`Erro ao salvar campo ${fieldName}:`, errorText)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erro ao salvar campo ${fieldName}:`, error)
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
