import 'dotenv/config'
import express, { Application } from 'express'
import { connectPubClient } from '@event-bus'
import cors from 'cors'
import './lib/redis'
import './lib/firebase-admin'
import './events'
import Routes from './routes'
import ApiNotFoundException from './exceptions/ApiNotFoundException'
import { isDevMode } from './lib/utils'
import { checkHealthRoute } from './checkhealth'
import { runScheduler } from "@task-runner";

runScheduler()

connectPubClient((err) => {
  console.log(err)
})
const app: Application = express()

console.log(`
------------------------------
Running in ${isDevMode() ? "Development" : "Production"} mode
------------------------------
`)

app.get('/', checkHealthRoute)
app.get('/check-health', checkHealthRoute)

app.use(
  cors({
    exposedHeaders: ['Authorization', 'RefreshToken']
  })
)
app.use(express.json())

app.use('/api', Routes)


// Catch wrong api name, method
app.use((req, res, next) => {
  console.log('URL:', req.url)
  const error = new ApiNotFoundException()
  next(error)
})

// Handling error middleware
// See: https://expressjs.com/en/guide/using-middleware.html
app.use((error, req, res, next) => {
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
