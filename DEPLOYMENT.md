# Cloudflare Pages Deployment Guide

## 🚀 Deployment Status

✅ **Staging Environment**: https://staging.mowjet.pages.dev  
✅ **Production Environment**: https://mowjet.pages.dev  
✅ **Custom Domain**: mowjet.com (configured)

## 📋 Required GitHub Secrets

Для автоматического деплоя через GitHub Actions необходимо настроить следующие secrets в репозитории:

### 1. CF_API_TOKEN
- **Значение**: `d5LafhpTUBpkJgDA0jLDs0gUBSYFDRLzIDBbQbUB`
- **Описание**: Cloudflare API Token с правами Pages:Edit

### 2. CF_ACCOUNT_ID
- **Значение**: `94708b682746403515f20731055474a6`
- **Описание**: Cloudflare Account ID

### 3. CF_PROJECT_NAME
- **Значение**: `mowjet`
- **Описание**: Название проекта в Cloudflare Pages

### 4. STAGING_BRANCH
- **Значение**: `staging`
- **Описание**: Название ветки для staging деплоя

## 🔧 How to Set Up GitHub Secrets

1. Перейдите в ваш GitHub репозиторий
2. Нажмите на **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **New repository secret**
4. Добавьте каждый secret с соответствующим именем и значением

## 🌐 Environment Variables (Pages Secrets)

Следующие переменные окружения уже настроены в Cloudflare Pages:

- `TELEGRAM_TOKEN`: `7440074610:AAHKSB8gYTgOjVunA-xagLQeObGeLVeHQOo`
- `TELEGRAM_CHAT_ID`: `6742290226`

## 🔄 Automatic Deployment

### Staging Deployment
- **Триггер**: Push в ветку `staging`
- **URL**: https://staging.mowjet.pages.dev
- **Workflow**: `.github/workflows/pages-staging.yml`

### Production Deployment
- **Триггер**: Push в ветку `main`
- **URL**: https://mowjet.pages.dev
- **Workflow**: `.github/workflows/pages-production.yml`

## 🛠️ Manual Deployment

Если нужно задеплоить вручную:

```bash
# Установить переменные окружения
$env:CLOUDFLARE_API_TOKEN="d5LafhpTUBpkJgDA0jLDs0gUBSYFDRLzIDBbQbUB"
$env:CLOUDFLARE_ACCOUNT_ID="94708b682746403515f20731055474a6"

# Переключиться на нужную ветку
git checkout staging  # или main

# Собрать проект
npm run build

# Задеплоить
npx wrangler pages deploy . --project-name "mowjet" --branch "staging"
```

## 📝 Notes

- Проект использует Next.js 15.5.0 с @cloudflare/next-on-pages
- Telegram интеграция настроена и работает
- Все секреты и токены уже сконфигурированы
- Custom domain mowjet.com подключен к проекту

## 🔍 Troubleshooting

Если деплой не работает:

1. Проверьте, что все GitHub Secrets настроены правильно
2. Убедитесь, что токен Cloudflare имеет права Pages:Edit
3. Проверьте логи в GitHub Actions
4. Убедитесь, что проект собирается локально (`npm run build`)
