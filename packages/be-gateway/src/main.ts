/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'dotenv/config'
import express, { Application } from 'express'
import { connectPubClient } from '@shared/pubsub'
import cors from 'cors'
import './lib/redis'
import './lib/firebase-admin'
import './events'
import Routes from './routes'
import ApiNotFoundException from './exceptions/ApiNotFoundException'
// import { Log } from './lib/log'

connectPubClient((err) => {
  console.log(err)
})
const app: Application = express()

app.get('/check-health', (req, res) => {
  // Log.info('Heelo')
  // Log.flush()
  res.send(`🚀🎃🎃🎨🎨:e Site available ${new Date()} `)
})

app.use(
  cors({
    exposedHeaders: ['Authorization', 'RefreshToken']
  })
)
app.use(express.json())

app.use('/api', Routes)


// Catch wrong api name, method
app.use((req, res, next) => {
  const error = new ApiNotFoundException()
  next(error)
})

// Handling error middleware
// See: https://expressjs.com/en/guide/using-middleware.html
app.use((error, req, res, nextr) => {
  const statusCode = error.status || 500
  console.log(error)
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error'
  })
})

const port = process.env.PORT || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
