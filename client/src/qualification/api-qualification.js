// API calls for the qualifications collection: /api/qualifications (CRUD)
import { request } from '../lib/request.js'

// POST /api/qualifications -> create
export const create = (qualification, token) => request('/api/qualifications', { method: 'POST', body: qualification, token })

// GET /api/qualifications -> read all
export const list = (token) => request('/api/qualifications', { token })

// GET /api/qualifications/:qualificationId -> read one
export const read = (qualificationId, token) => request('/api/qualifications/' + qualificationId, { token })

// PUT /api/qualifications/:qualificationId -> update
export const update = (qualificationId, qualification, token) =>
  request('/api/qualifications/' + qualificationId, { method: 'PUT', body: qualification, token })

// DELETE /api/qualifications/:qualificationId -> delete one
export const remove = (qualificationId, token) =>
  request('/api/qualifications/' + qualificationId, { method: 'DELETE', token })

// DELETE /api/qualifications -> delete all
export const removeAll = (token) => request('/api/qualifications', { method: 'DELETE', token })
