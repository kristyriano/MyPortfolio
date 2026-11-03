// Assignment 3 - Part II (f): hardcodes the Admin account in the MongoDB database.
// Run it once from the project root with:  npm run create-admin
// The admin credentials come from the .env file (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD).
// If the admin already exists, its password and role are reset to these values.
import mongoose from 'mongoose'
import config from '../../config/config.js'
import User from '../models/user.model.js'

const adminCredentials = {
  name: process.env.ADMIN_NAME || 'Portfolio Admin',
  email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
  password: process.env.ADMIN_PASSWORD || 'Admin123!',
}

const createAdmin = async () => {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('Connected to the database!')

    let admin = await User.findOne({ email: adminCredentials.email })
    if (!admin) {
      admin = new User({ name: adminCredentials.name, email: adminCredentials.email })
    }
    // Setting "password" saves only the salt and the hashed password (see user.model.js)
    admin.name = adminCredentials.name
    admin.password = adminCredentials.password
    admin.role = 'admin'
    admin.updated = Date.now()
    await admin.save()

    console.log(`Admin account ready: ${admin.email} (role: ${admin.role})`)
  } catch (err) {
    console.error('Could not create the admin account:', err.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

createAdmin()
