// User routes: /api/users
// Reading, updating and deleting one user are PROTECTED routes:
// they need a valid JWT token and the token must belong to that same user.
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router
  .route('/api/users')
  .get(userCtrl.list) // get all users
  .post(userCtrl.create) // add new user (sign up)
  .delete(authCtrl.requireSignin, userCtrl.removeAll) // remove all users (signed-in only)

router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read) // get user by id
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update) // update user by id
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove) // remove user by id

// Loads the user (req.profile) whenever the URL has :userId
router.param('userId', userCtrl.userByID)

export default router
