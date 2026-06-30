# Deploy na Hostgator - Quiz Bíblia

## Opções de Deploy

### Opção 1: VPS Hostgator (Recomendado para Next.js)

Se você tem um VPS na Hostgator com Node.js instalado.

### Opção 2: Build Estático + Servidor Estático

Se a Hostgator não tem Node.js, você pode exportar como HTML estático, mas **não vai funcionar** porque o quiz usa API routes para enviar leads ao ActiveCampaign.

---

## Pré-requisitos

- [ ] Acesso SSH ao servidor VPS
- [ ] Node.js 18+ instalado
- [ ] npm ou yarn
- [ ] Domínio apontado para o servidor

---

## Passo a Passo (VPS Hostgator)

### 1. Conectar ao Servidor via SSH

```bash
ssh usuario@seu-dominio.com
```

### 2. Criar diretório do projeto

```bash
mkdir -p /var/www/quiz-biblia
cd /var/www/quiz-biblia
```

### 3. Transferir arquivos do projeto

Na sua máquina local, dentro da pasta do projeto:

```bash
# Opção A: Git (se usar git)
git clone https://seu-repo.git .

# Opção B: Rsync via SSH
rsync -avz --exclude='node_modules' --exclude='.next' --exclude='.env*' ./ usuario@seu-dominio.com:/var/www/quiz-biblia/
```

### 4. Instalar dependências

```bash
cd /var/www/quiz-biblia
npm install
```

### 5. Configurar variáveis de ambiente

```bash
nano .env.local
```

Adicione:

```env
# ActiveCampaign
ACTIVE_CAMPAIGN_URL=https://suaempresa.api-us1.com
ACTIVE_CAMPAIGN_API_KEY=sua_chave_api_aqui
ACTIVE_CAMPAIGN_LIST_ID=123
ACTIVE_CAMPAIGN_TAG_ID=456

# CTA da Formação
NEXT_PUBLIC_CTA_URL=https://sua-formacao.com

# Campo personalizado (padrão, ajuste se necessário)
AC_FIELD_SCORE=score
AC_FIELD_LEVEL=level
AC_FIELD_ANSWERS=answers
AC_FIELD_PHONE=phone
```

Salve (Ctrl+X → Y → Enter)

### 6. Build do projeto

```bash
npm run build
```

### 7. Instalar PM2 (gerenciador de processos)

```bash
npm install -g pm2
```

### 8. Iniciar com PM2

```bash
pm2 start npm --name "quiz-biblia" -- start
```

### 9. Configurar para iniciar com o servidor

```bash
pm2 startup
pm2 save
```

### 10. Configurar Nginx como proxy reverso

```bash
nano /etc/nginx/sites-available/quiz-biblia
```

Cole:

```nginx
server {
    listen 80;
    server_name quiz.seudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ativar:

```bash
ln -s /etc/nginx/sites-available/quiz-biblia /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 11. Configurar SSL (HTTPS)

```bash
certbot --nginx -d quiz.seudominio.com
```

### 12. Verificar se está funcionando

```bash
pm2 logs quiz-biblia
curl -I https://quiz.seudominio.com
```

---

## Comandos Úteis do PM2

```bash
pm2 status              # Ver status
pm2 logs quiz-biblia    # Ver logs
pm2 restart quiz-biblia # Reiniciar
pm2 stop quiz-biblia    # Parar
pm2 delete quiz-biblia   # Remover
```

---

## Atualizações Futuras

Para atualizar o quiz:

```bash
# 1. Transferir novos arquivos ou fazer git pull
# 2. Reinstalar dependências (se necessário)
npm install

# 3. Rebuild
npm run build

# 4. Reiniciar
pm2 restart quiz-biblia
```

---

## Troubleshooting

### Porta 3000 já em uso

```bash
pm2 delete all
pm2 start npm --name "quiz-biblia" -- start
```

### Erro de permissão

```bash
sudo chown -R $USER:$USER /var/www/quiz-biblia
```

### Logs de erro

```bash
pm2 logs quiz-biblia --err
```

---

## Campos Personalizados no ActiveCampaign

Antes de ativar o quiz, crie estes campos no ActiveCampaign:

1. Acesse: **ActiveCampaign → Contatos → Campos Personalizados**
2. Crie os campos:

| Nome do Campo | Tipo |
|---------------|------|
| score | Numérico |
| level | Texto |
| answers_source | Texto |
| answers_medium | Texto |
| answers_campaign | Texto |
| answers_content | Texto |
| answers_term | Texto |
| phone | Texto |

**Importante:** Use exatamente estes nomes ou ajuste no `.env.local`.
