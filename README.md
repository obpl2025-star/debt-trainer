# Тренажёр взыскателя

## Инструкция по развёртыванию на Vercel

### Шаг 1: Загрузи файлы на GitHub

1. Создай репозиторий на GitHub
2. Загрузи все файлы из этой папки

### Шаг 2: Подключи к Vercel

1. Зайди на vercel.com
2. Нажми "Import Project"
3. Выбери свой GitHub репозиторий
4. Нажми "Deploy"

### Шаг 3: Добавь переменную окружения

1. После деплоя зайди в Settings → Environment Variables
2. Добавь переменную:
   - Name: `ANTHROPIC_API_KEY`
   - Value: твой API ключ от Anthropic (получи на console.anthropic.com)
3. Нажми "Save"
4. Redeploy проект

### Готово!

Твой тренажёр будет доступен по адресу: `https://твой-проект.vercel.app`

## Файлы

- `index.html` - главная страница тренажера
- `api/chat.js` - серверная функция для AI клиента
- `admin_panel.html` - панель администратора (открой локально)
- `vercel.json` - конфигурация Vercel
- `package.json` - метаданные проекта
