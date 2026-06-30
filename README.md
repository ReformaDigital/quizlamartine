# Quiz - Descubra Seu Nível de Especialista na Bíblia

Um quiz interativo de autodiagnóstico de conhecimento bíblico, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🚀 Como Rodar Localmente

### 1. Instale as dependências

```bash
npm install
# ou
pnpm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o `.env.local` conforme necessário. Para desenvolvimento, apenas o `NEXT_PUBLIC_CTA_URL` é obrigatório.

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### 4. Build para produção

```bash
npm run build
npm run start
```

---

## 📁 Estrutura de Arquivos

```
quiz/
├── .env.example           # Exemplo de variáveis de ambiente
├── .env.local            # Suas variáveis (não commitado)
├── .gitignore
├── package.json
├── tailwind.config.ts    # Configuração do Tailwind
├── tsconfig.json         # Configuração do TypeScript
├── next.config.js
├── postcss.config.js
│
└── src/
    ├── app/
    │   ├── api/
    │   │   └── lead/
    │   │       └── route.ts    # API para captura de leads (ActiveCampaign)
    │   ├── globals.css          # Estilos globais + CSS Variables
    │   ├── layout.tsx            # Layout principal
    │   └── page.tsx             # Página principal do quiz
    │
    ├── components/
    │   ├── OpeningScreen.tsx    # Tela inicial
    │   ├── QuizLayout.tsx       # Layout wrapper
    │   ├── ProgressBar.tsx      # Barra de progresso
    │   ├── QuizQuestion.tsx     # Card de pergunta
    │   ├── OptionCard.tsx       # Alternativas
    │   ├── LeadForm.tsx         # Formulário de captura
    │   ├── ResultScreen.tsx     # Tela de resultado
    │   ├── PitchSection.tsx     # Seção do vídeo
    │   ├── CTAButton.tsx        # Botão CTA reutilizável
    │   └── index.ts            # Exportações
    │
    ├── config/
    │   └── theme.ts            # 🎨 TOKENS VISUAIS (IDV)
    │
    └── data/
        └── quiz.ts             # 📝 PERGUNTAS E RESULTADOS
```

---

## 🎨 Onde Editar Cada Coisa

### Para trocar a Identidade Visual (IDV)

**Arquivo:** `src/config/theme.ts`

Este é o arquivo central de todos os tokens visuais. Contém:
- ✅ Cores principais (fundo, textos, acentos)
- ✅ Cores dos botões
- ✅ Cores dos estados (sucesso, erro)
- ✅ Tipografia (fontes serif e sans)
- ✅ Bordas e raios
- ✅ Sombras
- ✅ Espaçamentos

Basta editar os valores e todo o site atualiza automaticamente.

### Para editar perguntas

**Arquivo:** `src/data/quiz.ts`

Procure a seção `questions` e edite:
- `text`: texto da pergunta
- `alternatives`: array com as 4 alternativas
- `isCorrect`: qual é a resposta correta
- `feedback`: comentário shown após selecionar

### Para editar resultados

**Arquivo:** `src/data/quiz.ts`

Procure a seção `results`:
- `minScore` / `maxScore`: faixa de pontuação
- `title`: nome do nível
- `description`: texto descritivo

### Para inserir o vídeo do pitch

**Arquivo:** `src/components/PitchSection.tsx`

1. Substitua `VIDEO_PLACEHOLDER` pelo URL do seu vídeo:
   - YouTube: `https://www.youtube.com/embed/SEU_VIDEO_ID`
   - Vimeo: `https://player.vimeo.com/video/SEU_VIDEO_ID`

2. Descomente o `<iframe>` no componente

### Para editar textos de transição

**Arquivo:** `src/data/quiz.ts`

Procure a seção `videoTransition`:
- `headline`: título antes do vídeo
- `text`: texto motivacional

### Para editar o CTA final

**Arquivo:** `src/data/quiz.ts`

Procure a seção `cta`:
- `buttonText`: texto do botão
- `url`: link de destino

Ou altere `NEXT_PUBLIC_CTA_URL` no `.env.local`

---

## 🔌 Configurar ActiveCampaign

### 1. Obtenha as credenciais

No ActiveCampaign:
- **URL da API**: Configurações > Desenvolvedor > URL da API
- **Chave da API**: Configurações > Desenvolvedor > API Key

### 2. Crie campos personalizados

Acesse: **Contatos > Campos Personalizados** e crie:

| Nome de Exibição | Nome Técnico (API) |
|------------------|-------------------|
| Pontuação        | `score`           |
| Nível            | `level`           |
| Telefone         | `phone`           |
| Respostas Source | `answers_source`  |
| Respostas Medium | `answers_medium`  |
| Respostas Campaign| `answers_campaign`|

### 3. Crie uma Lista (opcional)

Crie uma lista para isolar os leads do quiz.

### 4. Crie uma Tag (opcional)

Crie uma tag para identificar estes leads.

### 5. Configure o .env.local

```env
ACTIVE_CAMPAIGN_URL=https://suaempresa.api-us1.com
ACTIVE_CAMPAIGN_API_KEY=sua_chave_api
ACTIVE_CAMPAIGN_LIST_ID=123
ACTIVE_CAMPAIGN_TAG_ID=456
AC_FIELD_SCORE=score
AC_FIELD_LEVEL=level
AC_FIELD_ANSWERS=answers
AC_FIELD_PHONE=phone
```

### Modo Desenvolvimento

Se as variáveis não estiverem configuradas, o sistema:
- ✅ Funciona normalmente visualmente
- ✅ Mostra aviso no console
- ✅ Retorna sucesso no formulário
- ✅ Não crasha

---

## 🌐 Publicar na Vercel

### 1. Faça deploy

```bash
# Instale a CLI da Vercel (se ainda não tiver)
npm i -g vercel

# Deploy
vercel
```

### 2. Configure variáveis de ambiente

Na dashboard da Vercel:
1. Acesse seu projeto > Settings > Environment Variables
2. Adicione todas as variáveis do `.env.example`
3. Faça um novo deploy

### 3. Configure o domínio (opcional)

Na Vercel:
1. Settings > Domains
2. Adicione seu subdominio (ex: quiz.seusite.com)

---

## 📱 Recursos Mobile

- ✅ Design mobile-first
- ✅ Responsivo para todos os tamanhos de tela
- ✅ Inputs otimizados para iOS (sem zoom)
- ✅ Scroll suave
- ✅ Animações reduzidas para quem prefere

---

## 🔒 Segurança

- ✅ API Key do ActiveCampaign nunca exposta ao front-end
- ✅ Validação de dados no servidor
- ✅ Campos personalizados salvos server-side
- ✅ .env.local não commitado

---

## 📦 Stack

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **API**: Next.js API Routes
- **Integração**: ActiveCampaign API v3

---

## 📋 Fluxo do Quiz

```
1. Tela de Abertura
   ↓
2. Perguntas (1-15)
   ↓
3. Formulário de Captura (Nome, Email, WhatsApp)
   ↓
4. Resultado + Vídeo Pitch + CTA
```

---

## 🎯 Resultado por Pontuação

| Pontuação | Nível |
|-----------|-------|
| 0-4       | Leitor Iniciante |
| 5-8       | Leitor em Desenvolvimento |
| 9-12      | Leitor Avançado |
| 13-15     | Especialista em Construção |

---

Feito com ❤️ para ajudar更多人 a conhecer a Bíblia.
