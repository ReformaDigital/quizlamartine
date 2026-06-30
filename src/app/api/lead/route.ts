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
        phone: data.phone,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('ActiveCampaign sync error:', error)
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
  const fieldPhone = process.env.AC_FIELD_PHONE || 'phone'

  // Garante que utms sempre exista, mesmo se vier undefined
  const utms = data.utms || {}

  // Campos personalizados a serem salvos
  const customFields = [
    { field: fieldScore, value: String(data.score) },
    { field: fieldLevel, value: data.level },
    { field: fieldPhone, value: data.phone },
    { field: 'date_lead', value: new Date().toISOString() },
    // UTMs
    { field: `${fieldAnswers}_source`, value: utms.utm_source || '' },
    { field: `${fieldAnswers}_medium`, value: utms.utm_medium || '' },
    { field: `${fieldAnswers}_campaign`, value: utms.utm_campaign || '' },
    { field: `${fieldAnswers}_content`, value: utms.utm_content || '' },
    { field: `${fieldAnswers}_term`, value: utms.utm_term || '' },
  ]

  // Atualiza cada campo personalizado
  for (const field of customFields) {
    if (!field.value) continue

    try {
      // Primeiro, busca o field ID pelo nome
      const fieldResponse = await fetch(
        `${acUrl}/api/3/fields?search=${field.field}`,
        {
          headers: { 'Api-Token': acKey },
        }
      )

      if (!fieldResponse.ok) continue

      const fieldResult = await fieldResponse.json()
      const fieldId = fieldResult.fields?.[0]?.id

      if (!fieldId) continue

      // Atualiza o campo
      await fetch(`${acUrl}/api/3/fieldValues`, {
        method: 'POST',
        headers: {
          'Api-Token': acKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fieldValue: {
            field: String(fieldId),
            contact: String(contactId),
            value: field.value,
          },
        }),
      })
    } catch (error) {
      console.error(`Erro ao salvar campo ${field.field}:`, error)
    }
  }

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
        { error: 'Erro ao processar lead no ActiveCampaign' },
        { status: 500 }
      )
    }

    // Operações em paralelo para melhor performance
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
      { error: 'Erro interno do servidor' },
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
