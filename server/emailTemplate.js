const SITE_URL = 'https://geodetic-sys.vercel.app'
const BRAND_NAME = 'ТопоСтройКадастр'
const LOGO_MAIN = 'ТопоСтрой'
const LOGO_ACCENT = 'Кадастр'

const COLORS = {
  bg: '#fcfcfc',
  white: '#ffffff',
  elevated: '#f5f5f5',
  dark: '#000000',
  text: '#000000',
  muted: '#5a5a5a',
  dim: '#888888',
  accent: '#ba0018',
  border: '#e8e8e8',
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function fieldRow(label, value) {
  return `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid ${COLORS.border};vertical-align:top;width:140px;">
        <span style="font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.dim};">${label}</span>
      </td>
      <td style="padding:14px 20px;border-bottom:1px solid ${COLORS.border};vertical-align:top;">
        <span style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:${COLORS.text};">${value}</span>
      </td>
    </tr>
  `
}

export function buildContactEmailHtml({ name, phone, email, message }) {
  const safeName = escapeHtml(name)
  const safePhone = escapeHtml(phone)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')
  const telHref = phone.replace(/[^\d+]/g, '')
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: Заявка — ${name}`)}`

  const now = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Новая заявка — ${BRAND_NAME}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Новая заявка с сайта от ${safeName}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${COLORS.bg};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:${COLORS.white};border:1px solid ${COLORS.border};border-bottom:none;padding:0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="height:4px;background-color:${COLORS.accent};font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 24px;">
                    <p style="margin:0 0 10px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.accent};">
                      Новая заявка
                    </p>
                    <h1 style="margin:0;font-family:'Playfair Display',Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;line-height:1.1;color:${COLORS.text};">
                      ${LOGO_MAIN}<span style="color:${COLORS.accent};">${LOGO_ACCENT}</span>
                    </h1>
                    <p style="margin:8px 0 0;font-family:Inter,Arial,sans-serif;font-size:13px;color:${COLORS.muted};">
                      Экспертная геодезия и кадастр
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body card -->
          <tr>
            <td style="background-color:${COLORS.white};border:1px solid ${COLORS.border};border-top:none;padding:0 0 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding:20px 32px 8px;">
                    <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:600;color:${COLORS.text};">
                      Данные заявки
                    </p>
                    <p style="margin:6px 0 0;font-family:Inter,Arial,sans-serif;font-size:13px;color:${COLORS.dim};">
                      ${escapeHtml(now)} · Москва
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 12px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${COLORS.elevated};border:1px solid ${COLORS.border};">
                      ${fieldRow('Имя', safeName)}
                      ${fieldRow('Телефон', `<a href="tel:${telHref}" style="color:${COLORS.text};text-decoration:none;">${safePhone}</a>`)}
                      ${fieldRow('Email', `<a href="mailto:${safeEmail}" style="color:${COLORS.accent};text-decoration:none;">${safeEmail}</a>`)}
                      <tr>
                        <td colspan="2" style="padding:16px 20px;">
                          <span style="display:block;margin-bottom:8px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.dim};">Описание</span>
                          <span style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.65;color:${COLORS.text};">${safeMessage}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 32px 28px;">
                    <a href="${replyHref}"
                       style="display:inline-block;padding:14px 28px;background-color:${COLORS.dark};color:${COLORS.white};font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;border-radius:2px;">
                      Ответить клиенту
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:${COLORS.dark};padding:24px 32px;border:1px solid ${COLORS.dark};">
              <p style="margin:0 0 6px;font-family:Inter,Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.72);">
                Письмо отправлено автоматически с сайта
                <a href="${SITE_URL}" style="color:${COLORS.white};text-decoration:underline;">${BRAND_NAME}</a>
              </p>
              <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:0.06em;color:rgba(255,255,255,0.45);">
                © ${BRAND_NAME} · Техническая точность гарантирована
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildContactEmailText({ name, phone, email, message }) {
  return [
    `${BRAND_NAME} — новая заявка с сайта`,
    '═'.repeat(40),
    '',
    `Имя:       ${name}`,
    `Телефон:   ${phone}`,
    `Email:     ${email}`,
    '',
    'Описание:',
    message,
    '',
    '─'.repeat(40),
    SITE_URL,
  ].join('\n')
}
