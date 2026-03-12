import { createHmac } from 'crypto'

export function generateAdminToken(password: string, secret: string) {
  return createHmac('sha256', secret).update(password).digest('hex')
}
