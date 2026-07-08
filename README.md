# GEODETIC.SYS

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
CONTACT_TO=th5tr@yandex.ru
```

## Production

```bash
npm run build
set NODE_ENV=production
npm start
```

Сервер отдаёт статику из `dist/` и обрабатывает `/api/contact`.

## Структура страниц

| Маршрут | Описание |
|---------|----------|
| `/` | Главная (лендинг) |
| `/services/topograficheskaya-semka` | Топографическая съёмка |
| `/services/kadastrovaya-semka` | Кадастровая съёмка |
| `/services/tehnicheskiy-plan` | Технический план |
| `/services/vynos-koordinat` | Вынос координат в натуру |
| `/services/ploshchadnye-harakteristiki` | Подтверждение площадных характеристик |
