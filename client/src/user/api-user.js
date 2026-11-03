// API calls for the users collection: /api/users
import { request } from '../lib/request.js'

// POST /api/users -> sign up (every new account gets the "user" role)
export const create = (user) => request('/api/users', { method: 'POST', body: user })

// GET /api/users -> all users (admin only)
export const list = (token) => request('/api/users', { token })

// DELETE /api/users/:userId -> remove one user (admin or the owner)
export const remove = (userId, token) =>
  request('/api/users/' + userId, { method: 'DELETE', token })
