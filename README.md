# ТопоСтройКадастр

Сайт геодезической компании — SPA на React + Vite с модульным SCSS и отправкой заявок на email.

## Стек

- React 19 + TypeScript
- React Router (SPA)
- SCSS Modules
- Express + Nodemailer (форма обратной связи)

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Настройка email (скопируйте и заполните)
copy .env.example .env

# Запуск фронтенда + API
npm run dev
```

- Сайт: http://localhost:5173
- API: http://localhost:3001

## Настройка отправки email (Yandex)

1. Скопируйте `.env.example` → `.env`
2. В [настройках Yandex](https://id.yandex.ru/security/app-passwords) создайте **пароль приложения**
3. Укажите в `.env`:

```
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=th5tr@yandex.ru
SMTP_PASS=ваш_пароль_приложения
CONTACT_TO=th5tr@yandex.ru,i.efremov.psk@yandex.ru
```

## Production (локально)

```bash
npm run build
set NODE_ENV=production
npm start
```

Сервер отдаёт статику из `dist/` и обрабатывает `/api/contact`.

## GitHub + Vercel

### 1. Репозиторий на GitHub

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/geodetic-sys.git
git push -u origin main
```

Создайте пустой репозиторий на [github.com/new](https://github.com/new) (без README и .gitignore).

### 2. Деплой на Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → импорт репозитория
2. Framework: **Vite** (определится автоматически)
3. Build Command: `npm run build`, Output: `dist`
4. **Environment Variables** (Settings → Environment Variables):

| Переменная | Значение |
|------------|----------|
| `SMTP_HOST` | `smtp.yandex.ru` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | ваш email Yandex |
| `SMTP_PASS` | пароль приложения Yandex |
| `CONTACT_TO` | email получателей заявок (несколько через запятую) |

5. Deploy

Форма на Vercel работает через serverless-функцию `api/contact.js` — отдельный сервер не нужен.

### 3. Проверка

После деплоя отправьте тестовую заявку с сайта. Письмо должно прийти на `CONTACT_TO`.

## Структура страниц

| Маршрут | Описание |
|---------|----------|
| `/` | Главная (лендинг) |
| `/services/topograficheskaya-semka` | Топографическая съёмка |
| `/services/kadastrovaya-semka` | Кадастровая съёмка |
| `/services/tehnicheskiy-plan` | Технический план |
| `/services/vynos-koordinat` | Вынос координат в натуру |
| `/services/ploshchadnye-harakteristiki` | Подтверждение площадных характеристик |
