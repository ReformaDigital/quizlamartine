# 📋 Relatório de Revisão de Produção

## ✅ Checklist de Segurança e Qualidade

### 1. API Key do ActiveCampaign nunca exposta ao front-end
- ✅ `ACTIVE_CAMPAIGN_API_KEY` é Server-side only (variável de ambiente)
- ✅ API Route `/api/lead` é a única interface com o ActiveCampaign
- ✅ Nenhuma chave de API aparece em componentes React
- ✅ Logs no console não expõem dados sensíveis

### 2. Quiz funciona sem ActiveCampaign configurado
- ✅ API detecta variáveis faltantes via `isActiveCampaignConfigured()`
- ✅ Retorna `{ success: true, mode: 'development' }` quando não configurado
- ✅ Console exibe aviso colorido de configuração pendente
- ✅ Formulário continua funcionando normalmente

### 3. Tokens visuais centralizados para IDV
**Arquivo:** `src/config/theme.ts`
- ✅ Todas as cores em `theme.colors`
- ✅ Fontes em `theme.fonts`
- ✅ Bordas e raios em `theme.borderRadius`
- ✅ Sombras em `theme.shadows`
- ✅ Espaçamentos em `theme.spacing`
- ✅ CSS Variables espelhadas em `globals.css`

### 4. Experiência Mobile
- ✅ Design mobile-first com Tailwind
- ✅ Inputs com `inputMode` para teclado correto no mobile
- ✅ Touch targets de pelo menos 44px
- ✅ Viewport meta configurado
- ✅ Previne zoom em inputs (font-size: 16px)
- ✅ Scroll suave com `scroll-behavior: smooth`
- ✅ Animações com `prefers-reduced-motion` support
- ✅ Layout responsivo com breakpoints

### 5. Estados de Loading, Erro e Sucesso
- ✅ **Loading:** Spinner animado + texto "Carregando..."
- ✅ **Sucesso:** Ícone verde + mensagem de confirmação
- ✅ **Erro:** Ícone vermelho + mensagem + ainda libera resultado
- ✅ **Formulário:** Validação inline com mensagens de erro

### 6. UTMs capturadas e enviadas
- ✅ Hook `useUTMs()` captura da URL automaticamente
- ✅ Captura: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- ✅ Enviadas para `/api/lead` junto com o lead
- ✅ Salvas como campos personalizados no ActiveCampaign

### 7. Código organizado para edição fácil
**Estrutura de arquivos por responsabilidade:**

| Arquivo | O que editar |
|---------|-------------|
| `src/data/quiz.ts` | Perguntas, respostas, resultados, textos |
| `src/config/theme.ts` | Cores, fontes, espaçamentos, IDV |
| `src/components/PitchSection.tsx` | URL do vídeo embed |
| `.env.local` | `NEXT_PUBLIC_CTA_URL` para CTA final |

---

## 📁 Arquivos Criados e Suas Funções

### Raiz do Projeto
```
quiz/
├── .env.example           # Template de variáveis de ambiente
├── .env.local            # Suas variáveis (desenvolvimento)
├── .gitignore            # Ignora node_modules e .env
├── package.json          # Dependências e scripts
├── tailwind.config.ts    # Configuração do Tailwind
├── tsconfig.json         # Configuração TypeScript
├── next.config.js       # Configuração Next.js
├── postcss.config.js    # PostCSS
└── README.md            # Documentação completa
```

### Código Fonte (`src/`)
```
src/
├── app/
│   ├── api/
│   │   └── lead/
│   │       └── route.ts    # API segura para ActiveCampaign
│   ├── globals.css          # Estilos globais + CSS Variables
│   ├── layout.tsx           # Layout raiz + metadata
│   └── page.tsx             # Página principal do quiz
│
├── components/
│   ├── OpeningScreen.tsx    # Tela inicial com CTA
│   ├── QuizLayout.tsx       # Layout wrapper (header/footer)
│   ├── ProgressBar.tsx     # Barra de progresso visual
│   ├── QuizQuestion.tsx     # Card de pergunta + navegação
│   ├── OptionCard.tsx       # Alternativas com feedback
│   ├── LeadForm.tsx         # Formulário de captura
│   ├── ResultScreen.tsx     # Tela de resultado
│   ├── PitchSection.tsx     # Seção do vídeo pitch
│   ├── CTAButton.tsx        # Botão reutilizável
│   ├── LoadingSpinner.tsx   # Spinner + skeletons
│   ├── Toast.tsx            # Notificações
│   ├── ResultBadge.tsx      # Badge de resultado
│   └── index.ts             # Exports centralizados
│
├── config/
│   └── theme.ts            # 🎨 TODOS OS TOKENS VISUAIS
│
├── data/
│   └── quiz.ts             # 📝 PERGUNTAS, RESULTADOS, TEXTOS
│
└── hooks/
    ├── useUTMs.ts          # Captura UTMs da URL
    └── useQuiz.ts          # Estado do quiz (opcional)
```

---

## 🚀 Como Publicar na Vercel

### Deploy Rápido
```bash
# 1. Instale a CLI da Vercel
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy
cd quiz
vercel

# 4. Para produção
vercel --prod
```

### Variáveis de Ambiente na Vercel
Acesse: **Dashboard > Projeto > Settings > Environment Variables**

| Variável | Valor |
|----------|-------|
| `ACTIVE_CAMPAIGN_URL` | `https://suaempresa.api-us1.com` |
| `ACTIVE_CAMPAIGN_API_KEY` | Sua chave da API |
| `ACTIVE_CAMPAIGN_LIST_ID` | ID da lista (opcional) |
| `ACTIVE_CAMPAIGN_TAG_ID` | ID da tag (opcional) |
| `AC_FIELD_SCORE` | `score` |
| `AC_FIELD_LEVEL` | `level` |
| `AC_FIELD_ANSWERS` | `answers` |
| `AC_FIELD_PHONE` | `phone` |
| `NEXT_PUBLIC_CTA_URL` | URL da Formação |

---

## 🧪 Como Testar Localmente

```bash
# 1. Entre no diretório
cd quiz

# 2. Instale dependências
npm install

# 3. Copie o template
cp .env.example .env.local

# 4. Inicie o dev server
npm run dev

# 5. Acesse
http://localhost:3000
```

### Testar sem ActiveCampaign
O quiz funciona sem nenhuma configuração. Apenas preencha o `.env.local` com:
```env
NEXT_PUBLIC_CTA_URL=https://seu-link.com
```
O resto é opcional.

---

## 🎨 Trocar a Identidade Visual

### Passo 1: Edite `src/config/theme.ts`

```typescript
export const theme = {
  colors: {
    background: '#SUA_COR',        // Fundo
    textPrimary: '#SUA_COR',      // Texto principal
    accentPrimary: '#SUA_COR',     // Cor de destaque
    // ... outras cores
  },
  fonts: {
    serif: "'Sua Fonte Serifada', serif",
    sans: "'Sua Fonte Sans', sans-serif",
  },
  // ...
}
```

### Passo 2: As CSS Variables em `globals.css` são atualizadas automaticamente

### Passo 3: Verifique o resultado

---

## 📝 Checklist Antes de Ir ao Ar

- [ ] Todas as 15 perguntas estão corretas
- [ ] Todas as respostas corretas estão definidas
- [ ] Textos dos resultados estão formatados
- [ ] Texto de transição para o vídeo está correto
- [ ] URL do CTA está configurada
- [ ] URL do vídeo embed está inserida
- [ ] ActiveCampaign está configurado (produção)
- [ ] Campos personalizados criados no AC
- [ ] Testou o fluxo completo no mobile
- [ ] Testou o formulário com dados reais
- [ ] Verificou UTMs sendo capturadas
- [ ] Deploy na Vercel concluído
- [ ] Domínio/subdomínio configurado

---

## 🔧 Troubleshooting

### Formulário não envia
1. Verifique se o `NEXT_PUBLIC_CTA_URL` está definido
2. Verifique se a API `/api/lead` responde (teste no Postman)

### ActiveCampaign não recebe leads
1. Verifique se `ACTIVE_CAMPAIGN_URL` e `ACTIVE_CAMPAIGN_API_KEY` estão corretos
2. Verifique se os campos personalizados existem no AC
3. Check os logs do servidor Vercel

### Video não carrega
1. Verifique se a URL do embed é `https://www.youtube.com/embed/ID`
2. Verifique se não há restrições no vídeo

---

Feito! 🎉
