// API calls for the contacts collection: /api/contacts (CRUD)
import { request } from '../lib/request.js'

// POST /api/contacts -> create
export const create = (contact, token) => request('/api/contacts', { method: 'POST', body: contact, token })

// GET /api/contacts -> read all
export const list = (token) => request('/api/contacts', { token })

// GET /api/contacts/:contactId -> read one
export const read = (contactId, token) => request('/api/contacts/' + contactId, { token })

// PUT /api/contacts/:contactId -> update
export const update = (contactId, contact, token) =>
  request('/api/contacts/' + contactId, { method: 'PUT', body: contact, token })

// DELETE /api/contacts/:contactId -> delete one
export const remove = (contactId, token) =>
  request('/api/contacts/' + contactId, { method: 'DELETE', token })

// DELETE /api/contacts -> delete all
export const removeAll = (token) => request('/api/contacts', { method: 'DELETE', token })
