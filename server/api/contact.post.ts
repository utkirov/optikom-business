export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { name, phone, tariffDetails } = body

  if (!name || !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Name and phone are required' })
  }

  const token = config.telegramBotToken
  const chatId = config.telegramChatId

  if (!token || !chatId) {
    throw createError({ statusCode: 500, statusMessage: 'Telegram credentials not configured' })
  }

  let text = `
🔔 <b>Новая заявка с сайта Optikom Business</b>

👤 <b>Имя / Компания:</b> ${escapeHtml(name)}
📞 <b>Телефон:</b> ${escapeHtml(phone)}
`

  if (tariffDetails) {
    text += `\n🛒 <b>Выбранный тариф:</b>\n`
    text += `• Интернет: ${escapeHtml(tariffDetails.internet)}\n`
    text += `• IT Обслуживание: ${escapeHtml(tariffDetails.itService)}\n`
    if (tariffDetails.extraServices && tariffDetails.extraServices.length > 0) {
      text += `• Доп. услуги: ${escapeHtml(tariffDetails.extraServices.join(', '))}\n`
    }
    text += `💰 <b>Итого абонплата:</b> ${escapeHtml(tariffDetails.totalPrice)} сум\n`
  }

  text += `\n🕐 <i>${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}</i>`

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
