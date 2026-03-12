import { requireAdminSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const { currentPassword, newPassword } = await readBody(event)
  const config = useRuntimeConfig()
  const storage = useStorage('db')

  // 1. Get current password from DB or config
  const storedPassword = await storage.getItem('admin_password') as string || config.adminPassword

  // 2. Validate current password
  if (currentPassword !== storedPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Текущий пароль указан неверно'
    })
  }

  if (!newPassword || newPassword.length < 4) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Новый пароль слишком короткий (минимум 4 символа)'
    })
  }

  // 3. Save new password to DB
  await storage.setItem('admin_password', newPassword)

  return { success: true }
})
