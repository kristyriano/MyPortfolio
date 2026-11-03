// API calls for authentication: /auth/signin and /auth/signout
import { request } from '../lib/request.js'

// POST /auth/signin -> returns { token, user: { _id, name, email, role } }
export const signin = (credentials) =>
  request('/auth/signin', { method: 'POST', body: credentials })

// GET /auth/signout -> clears the token cookie in the backend
export const signout = () => request('/auth/signout')
