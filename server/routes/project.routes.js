// Project routes: /api/projects
// Assignment 3 roles: everyone can view (GET), only the admin can create, update and delete.
import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/projects')
  .get(projectCtrl.list) // get all projects
  .post(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.create) // add new project (admin only)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.removeAll) // remove all projects (admin only)

router
  .route('/api/projects/:projectId')
  .get(projectCtrl.read) // get project by id
  .put(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.update) // update project by id (admin only)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.remove) // remove project by id (admin only)

// Loads the project whenever the URL has :projectId
router.param('projectId', projectCtrl.projectByID)

export default router
