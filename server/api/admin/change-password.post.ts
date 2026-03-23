import bcrypt from 'bcryptjs'
const { compare, hash } = bcrypt
import { requireAdminSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const { currentPassword, newPassword } = await readBody(event)
  const config = useRuntimeConfig()
  const storage = useStorage('db')

  const storedValue = await storage.getItem('admin_password') as string | null

  // Проверяем текущий пароль (поддержка bcrypt и plain text для миграции)
  let isValid = false
  if (storedValue) {
    try {
      isValid = await compare(currentPassword, storedValue)
    } catch {
      isValid = currentPassword === storedValue
    }
  } else {
    isValid = currentPassword === String(config.adminPassword)
  }

  if (!isValid) {
    throw createError({ statusCode: 400, statusMessage: 'Текущий пароль указан неверно' })
  }

  if (!newPassword || newPassword.length < 4) {
    throw createError({ statusCode: 400, statusMessage: 'Новый пароль слишком короткий (минимум 4 символа)' })
  }

  // Сохраняем хешированный пароль
  await storage.setItem('admin_password', await hash(newPassword, 12))

  return { success: true }
})
