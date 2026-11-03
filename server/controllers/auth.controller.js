// Authentication controller (Week 6): sign in, sign out and route protection with JWT
// Assignment 3: the token also carries the user role ("admin" or "user")
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from './../../config/config.js'

// POST /auth/signin -> checks email and password, returns a JWT token
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({ error: 'User not found' })

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." })
    }

    // The token carries the user id and role, and is signed with the secret key
    const token = jwt.sign({ _id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1d' })

    // The token is also saved in a cookie called "t"
    res.cookie('t', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' })
  }
}

// GET /auth/signout -> clears the token cookie
const signout = (req, res) => {
  res.clearCookie('t')
  return res.status(200).json({ message: 'signed out' })
}

// Middleware: the request must include a valid token (Authorization: Bearer <token>)
// If it is valid, the decoded token is saved in req.auth
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
})

// Middleware: a signed-in user can only see, edit or delete their own account
// (the admin can manage every account)
const hasAuthorization = (req, res, next) => {
  const isOwner = req.profile && req.auth && req.profile._id.toString() === req.auth._id
  const isAdminUser = req.auth && req.auth.role === 'admin'
  if (!isOwner && !isAdminUser) {
    return res.status(403).json({ error: 'User is not authorized' })
  }
  next()
}

// Middleware: only the admin can continue (create, update and delete records)
const isAdmin = (req, res, next) => {
  if (!req.auth || req.auth.role !== 'admin') {
    return res.status(403).json({ error: 'Admin role required. Users can only view the records.' })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization, isAdmin }
