// API calls for the projects collection: /api/projects (CRUD)
import { request } from '../lib/request.js'

// POST /api/projects -> create
export const create = (project, token) => request('/api/projects', { method: 'POST', body: project, token })

// GET /api/projects -> read all
export const list = (token) => request('/api/projects', { token })

// GET /api/projects/:projectId -> read one
export const read = (projectId, token) => request('/api/projects/' + projectId, { token })

// PUT /api/projects/:projectId -> update
export const update = (projectId, project, token) =>
  request('/api/projects/' + projectId, { method: 'PUT', body: project, token })

// DELETE /api/projects/:projectId -> delete one
export const remove = (projectId, token) =>
  request('/api/projects/' + projectId, { method: 'DELETE', token })

// DELETE /api/projects -> delete all
export const removeAll = (token) => request('/api/projects', { method: 'DELETE', token })
