// Project routes: /api/projects
import express from 'express'
import projectCtrl from '../controllers/project.controller.js'

const router = express.Router()

router
  .route('/api/projects')
  .get(projectCtrl.list) // get all projects
  .post(projectCtrl.create) // add new project
  .delete(projectCtrl.removeAll) // remove all projects

router
  .route('/api/projects/:projectId')
  .get(projectCtrl.read) // get project by id
  .put(projectCtrl.update) // update project by id
  .delete(projectCtrl.remove) // remove project by id

// Loads the project whenever the URL has :projectId
router.param('projectId', projectCtrl.projectByID)

export default router
