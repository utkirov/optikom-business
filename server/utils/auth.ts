export async function requireAdminSession(event: any) {
  const token = getCookie(event, 'admin_token')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const storage = useStorage('db')
  const storedToken = await storage.getItem('session_admin') as string | null

  if (!storedToken || storedToken !== token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
