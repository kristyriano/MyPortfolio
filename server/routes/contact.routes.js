// Contact routes: /api/contacts
import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'

const router = express.Router()

router
  .route('/api/contacts')
  .get(contactCtrl.list) // get all contacts
  .post(contactCtrl.create) // add new contact
  .delete(contactCtrl.removeAll) // remove all contacts

router
  .route('/api/contacts/:contactId')
  .get(contactCtrl.read) // get contact by id
  .put(contactCtrl.update) // update contact by id
  .delete(contactCtrl.remove) // remove contact by id

// Loads the contact whenever the URL has :contactId
router.param('contactId', contactCtrl.contactByID)

export default router
