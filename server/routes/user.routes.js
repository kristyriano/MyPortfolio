// User routes: /api/users
// Anyone can sign up (POST). Reading, updating and deleting one user are PROTECTED routes:
// they need a valid JWT token and the token must belong to that same user (or to the admin).
// Assignment 3: only the admin can list all users or delete all users.
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/users')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list) // get all users (admin only)
  .post(userCtrl.create) // add new user (sign up)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.removeAll) // remove all users (admin only)

router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read) // get user by id
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update) // update user by id
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove) // remove user by id

// Loads the user (req.profile) whenever the URL has :userId
router.param('userId', userCtrl.userByID)

export default router
