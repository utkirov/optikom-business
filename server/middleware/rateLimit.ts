// Rate limiting для /api/leads: максимум 5 запросов за 15 минут с одного IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 15 * 60 * 1000 // 15 минут
const MAX_REQUESTS = 5

export default defineEventHandler((event) => {
  if (!getRequestURL(event).pathname.startsWith('/api/leads')) return
  if (event.method !== 'POST') return

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()

  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return
  }

  entry.count++

  if (entry.count > MAX_REQUESTS) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Слишком много запросов. Попробуйте через 15 минут.'
    })
  }
})
