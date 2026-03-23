import { requireAdminSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdminSession(event)

  const { id } = await readBody(event)

  if (!id || !String(id).startsWith('lead_')) {
    throw createError({ statusCode: 400, statusMessage: 'Некорректный ID лида' })
  }

  const storage = useStorage('db')
  await storage.removeItem(String(id))

  return { success: true }
})
