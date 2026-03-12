import { defaultSettings } from '../../utils/defaultSettings'

export default defineEventHandler(async () => {
  const storage = useStorage('db')
  const settings = await storage.getItem('settings')
  
  if (!settings) {
    return defaultSettings
  }
  
  // Merge defaults to ensure no missing keys if new features are added
  return { ...defaultSettings, ...(settings as any) }
})
