// Shared helper used by every api-*.js file to call the Express backend.
// It sends JSON, adds the JWT token when there is one, and turns error responses into exceptions.
// The /api and /auth paths are forwarded to the backend by vite.config.js (and vercel.json online).
export async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { Accept: 'application/json' }
  if (body) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = 'Bearer ' + token

  const response = await fetch(path, {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })

  // Some responses may have no JSON body
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error((data && data.error) || `Request failed (${response.status})`)
  }
  return data
}
