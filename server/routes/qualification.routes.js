// Qualification routes: /api/qualifications
// Assignment 3 roles: everyone can view (GET), only the admin can create, update and delete.
import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/qualifications')
  .get(qualificationCtrl.list) // get all qualifications
  .post(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.create) // add new qualification (admin only)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.removeAll) // remove all qualifications (admin only)

router
  .route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.read) // get qualification by id
  .put(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.update) // update qualification by id (admin only)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.remove) // remove qualification by id (admin only)

// Loads the qualification whenever the URL has :qualificationId
router.param('qualificationId', qualificationCtrl.qualificationByID)

export default router
