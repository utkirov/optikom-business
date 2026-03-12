import { generateAdminToken } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  if (!body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Пароль обязателен' })
  }

  const storage = useStorage('db')
  const storedValue = await storage.getItem('admin_password')
  const storedPassword = String(storedValue || config.adminPassword)

  if (body.password !== storedPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный пароль' })
  }

  const token = generateAdminToken(config.adminPassword, config.jwtSecret as string)

  const cookieOpts = {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/'
  }

  // Server-side auth cookie (httpOnly — JS can't read it)
  setCookie(event, 'admin_token', token, { ...cookieOpts, httpOnly: true })

  // Client-side flag cookie (readable by useCookie for middleware redirect logic)
  setCookie(event, 'admin_logged_in', '1', { ...cookieOpts, httpOnly: false })

  return { success: true }
})

