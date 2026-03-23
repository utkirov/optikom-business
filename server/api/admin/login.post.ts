import bcrypt from 'bcryptjs'
const { compare, hash } = bcrypt
import { generateSessionToken } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  if (!body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Пароль обязателен' })
  }

  const storage = useStorage('db')
  const storedValue = await storage.getItem('admin_password')
  const storedPassword = storedValue ? String(storedValue) : null
  const configPassword = String(config.adminPassword)

  let isValid = false

  if (storedPassword) {
    // Пробуем bcrypt (новые хешированные пароли)
    try {
      isValid = await compare(body.password, storedPassword)
    } catch {
      // Fallback: plain text (миграция со старой системы)
      if (body.password === storedPassword) {
        isValid = true
        // Автоматически хешируем старый пароль
        await storage.setItem('admin_password', await hash(body.password, 12))
      }
    }
  } else {
    // Нет сохранённого пароля — используем дефолт из конфига
    isValid = body.password === configPassword
  }

  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный пароль' })
  }

  // Генерируем случайный токен сессии
  const token = generateSessionToken()

  // Сохраняем токен в KV
  await storage.setItem('session_admin', token)

  const TTL = 60 * 60 * 24 * 7 // 7 дней
  const cookieOpts = {
    maxAge: TTL,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/'
  }

  // Server-side auth cookie (httpOnly — JS не может читать)
  setCookie(event, 'admin_token', token, { ...cookieOpts, httpOnly: true })
  // Client-side флаг для middleware redirect
  setCookie(event, 'admin_logged_in', '1', { ...cookieOpts, httpOnly: false })

  return { success: true }
})
