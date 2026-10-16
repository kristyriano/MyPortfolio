// Express application: middleware, API routes and error handling
import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'

const app = express()

// Middleware: read JSON and form bodies, cookies, compress responses, secure headers, allow CORS
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// Welcome message shown at http://localhost:3000/
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio application.' })
})

// REST API routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', qualificationRoutes)

// Error handler: returns a clear message when the JWT token is missing or invalid
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: err.name + ': ' + err.message })
  }
  if (err) {
    console.log(err)
    return res.status(400).json({ error: err.name + ': ' + err.message })
  }
  next()
})

export default app
