// Entry point of the backend: connects to MongoDB and starts the Express server
import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message)
  })

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.message)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})
