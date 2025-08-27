export function getBaseUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  return env || 'http://localhost:3000'
}

