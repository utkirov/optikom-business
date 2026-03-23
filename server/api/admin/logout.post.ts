export default defineEventHandler(async (event) => {
  // Удаляем токен из KV
  const storage = useStorage('db')
  await storage.removeItem('session_admin')

  // Очищаем куки
  deleteCookie(event, 'admin_token', { path: '/' })
  deleteCookie(event, 'admin_logged_in', { path: '/' })

  return { success: true }
})
