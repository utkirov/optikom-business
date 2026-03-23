import { requireAdminSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // Ensure the user is an admin
  await requireAdminSession(event)
  
  const storage = useStorage('db')
  const keys = await storage.getKeys('')
  const leadKeys = keys.filter(k => k.startsWith('lead_'))
  
  const leads = await Promise.all(
    leadKeys.map(async (key) => {
      return await storage.getItem(key)
    })
  )
  
  // Sort by date descending
  return (leads as any[]).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})
