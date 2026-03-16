import { generateCP } from '../utils/pdf'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const leadId = `lead_${Date.now()}`

  const { name, phone, company, message, tariffDetails, locale } = body

  if (!name || !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Name and phone are required' })
  }

  const token = config.telegramBotToken
  const chatId = config.telegramChatId

  if (!token || !chatId) {
    throw createError({ statusCode: 500, statusMessage: 'Telegram credentials missing' })
  }

  // --- Подготовка данных ---
  const cleanPhone = phone.replace(/\D/g, '') // Только цифры: 998901234567
  const dialPhone = `+${cleanPhone}`          // Формат для ссылки в тексте

  // ВАЖНО: В inline_keyboard оставляем только WhatsApp (https), 
  // так как tel: в кнопках не поддерживается сервером Telegram.
  const keyboardString = JSON.stringify({
    inline_keyboard: [
      [
        { text: '💬 Написать в Телеграмм', url: `https://t.me/${dialPhone}` }
      ]
    ]
  })

  // --- Генерация PDF ---
  let pdfBuffer: Buffer | null = null
  try {
    if (tariffDetails && Object.keys(tariffDetails).length > 0) {
      const cpData = {
        name: company ? `${name} (${company})` : name,
        phone: phone || '',
        internet: tariffDetails.internet || '—',
        itService: tariffDetails.itService || '—',
        extraServices: Array.isArray(tariffDetails.extraServices) ? tariffDetails.extraServices : [],
        totalPrice: tariffDetails.totalPrice || '0',
        oneTimePrice: tariffDetails.oneTimePrice || '0',
        monthlyPrice: tariffDetails.monthlyPrice || '0',
        date: new Date().toLocaleDateString(locale === 'uz' ? 'uz-UZ' : 'ru-RU'),
        locale: locale || 'ru'
      }
      pdfBuffer = await generateCP(cpData)
    }
  } catch (err) {
    console.error('[Leads API] PDF Gen Error:', err)
  }

  const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })

  // --- 1. Отправка сообщения (sendMessage) ---
  try {
    let text = `🔔 <b>Новая заявка: Optikom Business</b>\n\n`
    text += `👤 <b>Имя:</b> ${escapeHtml(name)}\n`
    text += `🏢 <b>Компания:</b> ${escapeHtml(company || '—')}\n`
    text += `📞 <b>Телефон:</b> ${escapeHtml(dialPhone)}\n`
    text += `💬 <b>Сообщение:</b> ${escapeHtml(message || '—')}\n`

    if (tariffDetails && Object.keys(tariffDetails).length > 0) {
      text += `\n🛒 <b>Тариф:</b>\n`
      if (tariffDetails.internet) text += `• Интернет: ${escapeHtml(tariffDetails.internet)}\n`
      if (tariffDetails.itService) text += `• IT: ${escapeHtml(tariffDetails.itService)}\n`
      if (tariffDetails.extraServices?.length > 0) {
        text += `• Доп: ${escapeHtml(tariffDetails.extraServices.join(', '))}\n`
      }
      const price = tariffDetails.monthlyPrice || tariffDetails.totalPrice
      if (price) text += `💰 <b>Итого:</b> ${escapeHtml(price)} сум\n`
    }

    // Ссылка на звонок внутри текста (здесь tel: РАБОТАЕТ)
    text += `\n➡️ <a href="tel:${dialPhone}"><b>ПОЗВОНИТЬ КЛИЕНТУ</b></a>\n`
    text += `\n🕐 <i>${timestamp}</i>`

    await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: chatId,
        text: text.trim(),
        parse_mode: 'HTML',
        reply_markup: keyboardString
      }
    })
  } catch (error: any) {
    console.error('[Leads API] Telegram Message FAILED:', error.data || error.message)
  }

  // --- 2. Отправка PDF (sendDocument) ---
  if (pdfBuffer) {
    try {
      const formData = new FormData()
      formData.append('chat_id', chatId)
      const blob = new Blob([new Uint8Array(pdfBuffer)], { type: 'application/pdf' })
      formData.append('document', blob, `Order_${cleanPhone}.pdf`)
      formData.append('caption', `📄 КП для <b>${escapeHtml(name)}</b>`)
      formData.append('parse_mode', 'HTML')
      formData.append('reply_markup', keyboardString)

      await $fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
        method: 'POST',
        body: formData
      })
    } catch (error: any) {
      console.error('[Leads API] Telegram PDF FAILED:', error.data || error.message)
    }
  }

  // --- 3. Сохранение ---
  try {
    const storage = useStorage('db')
    await storage.setItem(leadId, { id: leadId, name, phone, createdAt: new Date().toISOString() })
  } catch (e) { }

  return { 
    success: true, 
    pdf: pdfBuffer ? pdfBuffer.toString('base64') : null,
    fileName: `Optikom_CP_${name.replace(/\s+/g, '_')}.pdf`
  }
})

function escapeHtml(str: any): string {
  if (!str) return ''
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}