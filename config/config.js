// Central configuration for the backend.
// Values come from the .env file in the project root, with safe defaults for development.
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load .env from the project root, even when the server is started from the client folder
const currentFolder = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(currentFolder, '..', '.env') })

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret_key',
  mongoUri:
    process.env.MONGODB_URI ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/Portfolio',
}

export default config
