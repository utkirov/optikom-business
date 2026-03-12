export default defineEventHandler(async (event) => {
  // Clear both cookies
  deleteCookie(event, 'admin_token', { path: '/' })
  deleteCookie(event, 'admin_logged_in', { path: '/' })

  return { success: true }
})
