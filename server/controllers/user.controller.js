// User controller: CRUD operations for the "users" collection
// hashed_password and salt are always removed before sending a user back
import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Removes the password data from a user before returning it
const hidePassword = (user) => {
  user.hashed_password = undefined
  user.salt = undefined
  return user
}

// POST /api/users -> add a new user (sign up)
const create = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({ message: 'Successfully signed up!' })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// GET /api/users -> get all users
const list = async (req, res) => {
  try {
    const users = await User.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// Runs for every route with :userId -> finds the user and saves it in req.profile
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' })
  }
}

// GET /api/users/:userId -> get user by id
const read = (req, res) => {
  return res.json(hidePassword(req.profile))
}

// PUT /api/users/:userId -> update user by id
const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    res.json(hidePassword(user))
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/users/:userId -> remove user by id
const remove = async (req, res) => {
  try {
    const user = req.profile
    await user.deleteOne()
    res.json({ message: 'User successfully deleted!', user: hidePassword(user) })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/users -> remove all users
const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({})
    res.json({ message: `${result.deletedCount} user(s) deleted successfully!` })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, userByID, read, list, update, remove, removeAll }
