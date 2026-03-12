import { requireAdminSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // Ensure the user is an admin
  requireAdminSession(event)
  
  const body = await readBody(event)
  const storage = useStorage('db')
  
  // Save settings
  await storage.setItem('settings', body)
  
  return { success: true }
})
