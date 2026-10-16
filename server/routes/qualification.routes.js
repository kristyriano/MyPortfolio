// Qualification (education) routes: /api/qualifications
import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'

const router = express.Router()

router
  .route('/api/qualifications')
  .get(qualificationCtrl.list) // get all qualifications
  .post(qualificationCtrl.create) // add new qualification
  .delete(qualificationCtrl.removeAll) // remove all qualifications

router
  .route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.read) // get qualification by id
  .put(qualificationCtrl.update) // update qualification by id
  .delete(qualificationCtrl.remove) // remove qualification by id

// Loads the qualification whenever the URL has :qualificationId
router.param('qualificationId', qualificationCtrl.qualificationByID)

export default router
