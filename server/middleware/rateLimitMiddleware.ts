import { defineEventHandler, H3Event, sendError } from 'h3'
import LRU from 'lru-cache'

// Configure the LRU cache
const rateLimitCache = new LRU<string, number>({
  max: 500, // Maximum number of IPs to keep in cache
  ttl: 1000 * 60 * 15 // Cache expiration time in milliseconds (15 minutes)
})

// Helper function to get client IP
const getClientIP = (req: H3Event['req']): string => {
  const forwarded = req.headers['x-forwarded-for'] as string | undefined
  return forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress || ''
}

// Middleware to rate limit requests
export default defineEventHandler((event) => {
  const clientIP = getClientIP(event.node.req)

  if (!clientIP) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Unable to determine IP address' }))
  }

  const currentTime = Date.now()
  const ipData = rateLimitCache.get(clientIP)

  if (ipData) {
    const [lastRequestTime, requestCount] = ipData
    const timeDiff = currentTime - lastRequestTime

    // Reset count if time window has passed
    if (timeDiff > 60000) {
      rateLimitCache.set(clientIP, [currentTime, 1])
    } else if (requestCount >= 100) {
        return sendError(event, createError({ statusCode: 429, statusMessage: 'Too Many Requests' }))
      } else {
        rateLimitCache.set(clientIP, [lastRequestTime, requestCount + 1])
      }
  } else {
    rateLimitCache.set(clientIP, [currentTime, 1])
  }
})
