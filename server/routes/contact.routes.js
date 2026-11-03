// Contact routes: /api/contacts
// Assignment 3 roles: any visitor can send the Contact form (POST),
// signed-in users (user or admin) can view the contacts, only the admin can update or delete them.
import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/contacts')
  .get(authCtrl.requireSignin, contactCtrl.list) // get all contacts
  .post(contactCtrl.create) // add new contact (public: the Contact form of the site)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.removeAll) // remove all contacts (admin only)

router
  .route('/api/contacts/:contactId')
  .get(authCtrl.requireSignin, contactCtrl.read) // get contact by id
  .put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.update) // update contact by id (admin only)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove) // remove contact by id (admin only)

// Loads the contact whenever the URL has :contactId
router.param('contactId', contactCtrl.contactByID)

export default router
