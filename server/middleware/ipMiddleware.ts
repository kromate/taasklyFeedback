import { defineEventHandler, H3Event } from 'h3'

const getClientIP = (req: H3Event['req']): string => {
  // If the app is behind a proxy (like Vercel), the IP address will be in the x-forwarded-for header
  const forwarded = req.headers['x-forwarded-for'] as string | undefined
  return forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress || ''
}

export default defineEventHandler((event) => {
  // Get client IP
  const clientIP = getClientIP(event.node.req)

  // Attach IP to the request context for later use in the app
  event.context.ip = clientIP
})
