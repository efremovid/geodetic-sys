/**
 * Проверка SMTP-подключения к Yandex.
 * Запуск: скопируйте .env.example → .env, заполните SMTP_* и выполните:
 *   node scripts/test-smtp.mjs
 */
import 'dotenv/config'
import nodemailer from 'nodemailer'

function env(name) {
  const value = process.env[name]
  if (!value) return ''
  return value.trim().replace(/^["']|["']$/g, '')
}

const host = env('SMTP_HOST') || 'smtp.yandex.ru'
const user = env('SMTP_USER')
const pass = env('SMTP_PASS')
const port = Number(env('SMTP_PORT') || 465)
const to = env('CONTACT_TO') || user

if (!user || !pass) {
  console.error('Заполните SMTP_USER и SMTP_PASS в файле .env')
  process.exit(1)
}

const secure = port === 465

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  requireTLS: !secure,
  auth: { user, pass },
  connectionTimeout: 15_000,
  tls: { minVersion: 'TLSv1.2' },
})

console.log(`Проверка: ${user} → ${host}:${port} (secure=${secure})`)

try {
  await transporter.verify()
  console.log('✓ Подключение и авторизация успешны')

  await transporter.sendMail({
    from: `"GEODETIC.SYS test" <${user}>`,
    to,
    subject: 'Тест GEODETIC.SYS',
    text: 'Если вы видите это письмо — SMTP настроен правильно.',
  })
  console.log(`✓ Тестовое письмо отправлено на ${to}`)
} catch (err) {
  console.error('✕ Ошибка:', err.message)
  if (err.code === 'EAUTH' || err.responseCode === 535) {
    console.error(`
Подсказка:
1. Включите доступ для почтовых программ: https://mail.yandex.ru → Настройки → Почтовые программы
2. Создайте пароль приложения: https://id.yandex.ru/security/app-passwords
3. SMTP_PASS — только пароль приложения (16 символов), не пароль от аккаунта
4. SMTP_USER — полный адрес, например th5tr@yandex.ru
`)
  }
  process.exit(1)
}
