import { generateAdminToken } from './session'

export function requireAdminSession(event: any) {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'admin_token')
  const expectedToken = generateAdminToken(config.adminPassword, config.jwtSecret as string)

  if (!token || token !== expectedToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
