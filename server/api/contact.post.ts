export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { name, phone } = body

  if (!name || !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Name and phone are required' })
  }

  const token = config.telegramBotToken
  const chatId = config.telegramChatId

  if (!token || !chatId) {
    throw createError({ statusCode: 500, statusMessage: 'Telegram credentials not configured' })
  }

  const text = `
🔔 <b>Новая заявка с сайта Optikom Business</b>

👤 <b>Имя / Компания:</b> ${escapeHtml(name)}
📞 <b>Телефон:</b> ${escapeHtml(phone)}

🕐 <i>${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}</i>
`.trim()

  const url = `https://api.telegram.org/bot${token}/sendMessage`

  const response = await $fetch<{ ok: boolean }>(url, {
    method: 'POST',
    body: {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    },
  })

  if (!response.ok) {
    throw createError({ statusCode: 502, statusMessage: 'Failed to send Telegram message' })
  }

  return { success: true }
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
