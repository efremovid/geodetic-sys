import nodemailer from 'nodemailer'
import { buildContactEmailHtml, buildContactEmailText } from './emailTemplate.js'

const BRAND_NAME = 'ТопоСтройКадастр'

function env(name) {
  const value = process.env[name]
  if (!value) return ''
  return value.trim().replace(/^["']|["']$/g, '')
}

function createTransporter() {
  const host = env('SMTP_HOST')
  const user = env('SMTP_USER')
  const pass = env('SMTP_PASS')
  const port = Number(env('SMTP_PORT') || 465)

  if (!host || !user || !pass) {
    return null
  }

  const secure = port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: { user, pass },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
    tls: {
      minVersion: 'TLSv1.2',
    },
  })
}

function mapSmtpError(err) {
  const code = err?.code
  const responseCode = err?.responseCode

  if (code === 'EAUTH' || responseCode === 535) {
    return 'Ошибка авторизации почты. Проверьте SMTP_USER и пароль приложения Yandex.'
  }

  if (code === 'ETIMEDOUT' || code === 'ECONNECTION' || code === 'ESOCKET') {
    return 'Не удалось подключиться к почтовому серверу. Попробуйте позже.'
  }

  return 'Не удалось отправить письмо. Попробуйте позже.'
}

export async function sendContactEmail(body) {
  const { name, phone, email, message } = body ?? {}

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
    return {
      status: 400,
      body: { error: 'Заполните обязательные поля' },
    }
  }

  const smtpUser = env('SMTP_USER')
  const transporter = createTransporter()
  const toEmail = env('CONTACT_TO') || smtpUser

  if (!transporter || !toEmail) {
    console.error('SMTP not configured')
    return {
      status: 503,
      body: { error: 'Сервис отправки не настроен. Обратитесь к администратору сайта.' },
    }
  }

  const payload = { name, phone, email, message }
  const html = buildContactEmailHtml(payload)
  const text = buildContactEmailText(payload)

  try {
    await transporter.verify()

    await transporter.sendMail({
      from: `"${BRAND_NAME}" <${smtpUser}>`,
      to: toEmail,
      replyTo: email.trim(),
      subject: `Заявка с сайта — ${name}`,
      html,
      text,
    })

    return { status: 200, body: { success: true } }
  } catch (err) {
    console.error('Email send error:', err)
    return {
      status: 500,
      body: { error: mapSmtpError(err) },
    }
  }
}
