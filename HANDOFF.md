# Handoff - Quiz Bíblia Panorama

> Documento de referência completa do projeto, status atual e próximos passos.

**Última atualização:** 30/06/2026
**Status do projeto:** ✅ **100% funcional em produção**

---

## Visão Geral do Projeto

Quiz interativo de 15 perguntas sobre conhecimento bíblico, com captura de leads e integração com ActiveCampaign. Desenvolvido em Next.js 14, hospedado na Vercel, com código versionado no GitHub.

**Objetivo:** Capturar leads qualificados para a Formação Panorama da Bíblia do Lamartine Posella.

**URL de produção:** https://quizlamartine.reformadigital.org

---

## Infraestrutura

### Domínio

| Tipo | URL | Status |
|------|-----|--------|
| **Produção** | `https://quizlamartine.reformadigital.org` | ✅ Ativo com SSL |
| **Vercel padrão** | `https://quiz-ten-sepia.vercel.app` | ✅ Ativo (manter como backup) |
| **Antigo (GreatPages)** | `lamartine.reformadigital.org` | Em desuso |

### Hospedagem

| Plataforma | Uso | URL |
|-----------|-----|-----|
| **Vercel** | Quiz + API | `https://quiz-ten-sepia.vercel.app` |
| **GitHub** | Código-fonte | `https://github.com/ReformaDigital/quizlamartine` |
| **ActiveCampaign** | CRM + Automações | `https://lamartine.activehosted.com` |

### Plano Vercel
**Pro** ($20/mês) — escolhido para garantir disponibilidade em caso de tráfego intenso.

---

## Stack Técnico

- **Framework:** Next.js 14.2.35
- **Linguagem:** TypeScript 5.3.0
- **UI:** React 18 + Tailwind CSS 3.3.6
- **Ícones:** lucide-react
- **Build:** Standalone Next.js (não estático, pois usa API routes)

---

## Estrutura do Projeto

```
quiz/
├── src/
│   ├── app/
│   │   ├── api/lead/route.ts        # API que envia leads pro ActiveCampaign
│   │   ├── layout.tsx                # Layout raiz
│   │   └── page.tsx                  # Página principal do quiz
│   ├── components/                   # 17 componentes React
│   │   ├── OpeningScreen.tsx         # Tela inicial (input de nome)
│   │   ├── ConversationPanel.tsx     # Exibe perguntas
│   │   ├── LeadForm.tsx              # Formulário email + WhatsApp
│   │   ├── ResultScreen.tsx          # Tela de resultado final
│   │   └── ...
│   ├── data/
│   │   └── quiz.ts                   # Perguntas, respostas e níveis
│   └── hooks/
│       ├── useQuiz.ts                # Estado do quiz
│       └── useUTMs.ts                # Captura UTMs da URL
├── public/                            # Assets estáticos
├── .env.example                       # Template de variáveis
└── package.json
```

---

## Fluxo do Quiz

```
1. Usuário acessa o quiz
   ↓
2. Tela inicial (OpeningScreen)
   - Input: Nome
   - Validação: mínimo 2 caracteres
   ↓
3. Quiz (ConversationPanel)
   - 15 perguntas com alternativas A/B/C/D
   - Cada resposta é salva em state (committedAnswers)
   - Score parcial é calculado em tempo real
   ↓
4. Formulário (LeadForm)
   - Campos: Email + WhatsApp
   - Captura UTMs da URL via useUTMs
   - Envia tudo para /api/lead
   ↓
5. Resultado (ResultScreen)
   - Exibe score final (0-15)
   - Mostra nível (Iniciante/Desenvolvimento/Avançado/Especialista)
   - Mostra diagnóstico personalizado
```

---

## Mapeamento de Dados

### Campos do ActiveCampaign criados

| ID | Título | Tipo | Função |
|----|--------|------|--------|
| 43 | `quiz_score` | text | Pontuação do quiz (0-15) |
| 44 | `quiz_level` | text | Nível do lead |
| 45 | `phone` | text | WhatsApp do lead (custom — não usar, conflito com nativo) |
| 46 | `answers_source` | text | UTM source |
| 47 | `answers_medium` | text | UTM medium |
| 48 | `answers_campaign` | text | UTM campaign |
| 49 | `answers_content` | text | UTM content |
| 50 | `answers_term` | text | UTM term |
| 11 | `date_lead` | datetime | Data/hora do lead |

**IMPORTANTE:** Todos esses campos precisam estar **habilitados/visíveis na lista `[PDB12] QUIZ LEADS`** (ID 251). Se algum campo não estiver marcado, a automação não vai conseguir ler o valor dele e a planilha vai ficar com aquela coluna vazia.

### Lista e Tag

| Recurso | ID | Nome |
|---------|-----|------|
| Lista | 251 | `[PDB12] QUIZ LEADS` |
| Tag | 784 | `[PDB12] - QUIZ LEADS` |

---

## Variáveis de Ambiente (Vercel)

Configuradas em **Production** e **Development**:

| Variável | Valor |
|----------|-------|
| `ACTIVE_CAMPAIGN_URL` | `https://lamartine.api-us1.com` |
| `ACTIVE_CAMPAIGN_API_KEY` | `5ada314a573a16a90f62e1ba8cf467fde702e32a21c201078f0e315b9162a1a2437e72e5` |
| `ACTIVE_CAMPAIGN_LIST_ID` | `251` |
| `ACTIVE_CAMPAIGN_TAG_ID` | `784` |
| `AC_FIELD_SCORE` | `quiz_score` |
| `AC_FIELD_LEVEL` | `quiz_level` |
| `AC_FIELD_ANSWERS` | `answers` |

---

## Integração com ActiveCampaign

### API Route: `/api/lead`

**Endpoint:** `POST /api/lead`

**Payload esperado:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "score": 0-15,
  "level": "string",
  "utms": {
    "utm_source": "string",
    "utm_medium": "string",
    "utm_campaign": "string",
    "utm_content": "string",
    "utm_term": "string"
  }
}
```

**Operações realizadas:**
1. Valida nome e email (obrigatórios)
2. **Upsert inteligente**: tenta criar via `sync`, se já existir (duplicate), atualiza via `PUT`
3. Reseta `bounced_hard` ao atualizar contatos existentes
4. Adiciona contato na lista `[PDB12]` (ID 251)
5. Aplica tag `[PDB12] - QUIZ LEADS` (ID 784)
6. Salva 8 campos personalizados + `date_lead` (em paralelo)

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Lead salvo com sucesso",
  "contactId": 123456
}
```

---

## Planilha Google Sheets

### URL
https://docs.google.com/spreadsheets/d/1WKWNZBjKBLb6P_7y05kgd3NOUUWfNB3oNIsvmkdcqRk/edit

### Estrutura de Colunas

| Coluna | Campo | Origem |
|--------|-------|--------|
| A | Nome | `%FIRSTNAME% %LASTNAME%` |
| B | Email | `%EMAIL%` |
| C | Telefone | `%PHONE%` |
| D | Data de cadastro | `date_lead` |
| E | source | `answers_source` |
| F | medium | `answers_medium` |
| G | campaign | `answers_campaign` |
| H | content | `answers_content` |
| I | term | `answers_term` |
| J | score | `quiz_score` |
| K | level | `quiz_level` |

---

## Automação no ActiveCampaign

### Configuração Atual

**Gatilho:** Contato com inscrição na lista `[PDB12] QUIZ LEADS` (ID 251)

**Blocos:**
1. **Atualizar contato:** `date_lead` ← hora atual
2. **Google Sheets - Add a row:** Adiciona linha na planilha

**Mapeamento configurado (todos os 11 campos estão mapeados).**

---

## Bugs Corrigidos (histórico)

### Bug 1: Erro 500 quando utms vinha undefined
**Fix:** Fallback em `route.ts` e `LeadForm.tsx` — sempre envia utms mesmo se vazio.

### Bug 2: Campos score/level salvando no lugar errado
**Fix:** Renomeados para `quiz_score` e `quiz_level` (não conflitam com campos antigos `lead_score`).

### Bug 3: ActiveCampaign rejeitava telefone formatado
**Sintoma:** Erro 422 no `contacts/sync` quando telefone vinha como `(11) 99999-9999`
**Fix:** API agora envia telefone sem máscara (apenas dígitos).

### Bug 4: Planilha recebia colunas E-K vazias
**Causa raiz:** Os campos customizados não estavam habilitados na lista `[PDB12]`. O AC salvava os valores, mas a automação não conseguia lê-los.
**Fix:** Todos os campos customizados foram habilitados na lista (config manual no AC).

### Bug 5: Contatos bounced não podiam ser atualizados
**Sintoma:** Erro 422 "O email já existe no sistema" para contatos com `bounced_hard > 0`
**Fix:** `syncContact` agora detecta duplicate, busca o contato existente e atualiza via `PUT`, resetando `bounced_hard`.

### Bug 6: LeadForm mostrava "erro" mas redirecionava pro resultado
**Sintoma:** Frontend redirecionava para tela de resultado mesmo após erro da API
**Fix:** Removido `setTimeout(onSubmitSuccess, 2000)` do catch. Agora só redireciona em caso de sucesso.

### Bug 7: Salvamento de campos era sequencial (lento)
**Fix:** `saveCustomFields` agora usa `Promise.allSettled` para salvar todos os campos em paralelo.

---

## Como fazer um Deploy/Atualização

### Via GitHub (deploy automático)
```bash
git add .
git commit -m "mensagem"
git push origin main
# Vercel detecta e faz deploy automático
```

### Via Vercel CLI
```bash
vercel deploy --yes --prod
```

---

## Credenciais (referência rápida)

| Serviço | Onde encontrar |
|---------|----------------|
| **Vercel** | https://vercel.com/dashboard (conta: reforma-digital) |
| **GitHub** | https://github.com/ReformaDigital/quizlamartine |
| **ActiveCampaign** | https://lamartine.activehosted.com |
| **API Token AC** | (em variáveis de ambiente da Vercel) |
| **GitHub PAT** | (disponível localmente — não commitar) |

---

## Próximos Passos Recomendados

1. **Documentar para o time de marketing/vendas** — Como criar campanhas com UTMs
2. **Configurar UTM defaults** — Para tráfego direto sem UTMs
3. **A/B testing** — Variar headline/CTA da tela inicial
4. **Métricas** — Integrar com Google Analytics ou Plausible
5. **Limpar campo `phone` custom (ID 45)** — É redundante com o campo nativo do AC

---

## Links Importantes

- **Quiz em produção:** https://quizlamartine.reformadigital.org
- **Quiz (URL Vercel):** https://quiz-ten-sepia.vercel.app
- **Repositório:** https://github.com/ReformaDigital/quizlamartine
- **Planilha:** https://docs.google.com/spreadsheets/d/1WKWNZBjKBLb6P_7y05kgd3NOUUWfNB3oNIsvmkdcqRk/edit
- **Painel Vercel:** https://vercel.com/reforma-digital/quiz
- **ActiveCampaign:** https://lamartine.activehosted.com
