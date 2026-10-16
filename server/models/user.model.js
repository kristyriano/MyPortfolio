// User model -> "users" collection
// The plain password is never saved: it is hashed with a random salt (Week 6 - Authentication)
import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
})

// "password" is a virtual field: setting it stores only the salt and the hash
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

// Password rules: required for new users and at least 6 characters
UserSchema.path('hashed_password').validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  // Compares a plain text password with the saved hash (used at sign in)
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  // Creates the hash of a password using the user's salt
  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
  // Random salt so two equal passwords never produce the same hash
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },
}

export default mongoose.model('User', UserSchema)
