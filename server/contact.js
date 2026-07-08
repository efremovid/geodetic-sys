import nodemailer from 'nodemailer'

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    secure: SMTP_SECURE !== 'false',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

export async function sendContactEmail(body) {
  const { name, phone, email, message } = body ?? {}

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
    return {
      status: 400,
      body: { error: 'Заполните обязательные поля' },
    }
  }

  const transporter = createTransporter()
  const toEmail = process.env.CONTACT_TO || process.env.SMTP_USER

  if (!transporter || !toEmail) {
    console.error('SMTP not configured')
    return {
      status: 503,
      body: { error: 'Сервис отправки не настроен. Обратитесь к администратору сайта.' },
    }
  }

  const html = `
    <h2>Новая заявка с сайта GEODETIC.SYS</h2>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Описание:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `

  try {
    await transporter.sendMail({
      from: `"GEODETIC.SYS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email.trim(),
      subject: `Заявка с сайта — ${name}`,
      html,
      text: [
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Email: ${email}`,
        `Описание: ${message}`,
      ].join('\n'),
    })

    return { status: 200, body: { success: true } }
  } catch (err) {
    console.error('Email send error:', err)
    return {
      status: 500,
      body: { error: 'Не удалось отправить письмо. Попробуйте позже.' },
    }
  }
}
