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
import { isDevMode } from './lib/utils'
// import { Log } from './lib/log'

connectPubClient((err) => {
  console.log(err)
})
const app: Application = express()

console.log(`
------------------------------
Running in ${isDevMode() ? "Development" : "Production"} mode
------------------------------
`)

app.get('/', (req, res) => {
  res.send(`
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="h-screen w-screen bg-black flex items-center justify-center">
    <div style="width: 800px" class="text-gray-100 text-center">
      <h1 class="text-5xl font-bold">The Backend is available !</h1>
      <p class="mt-8">Last deployment time</p>
      <p class="mt-2">${new Date()}</p>
    </div>
  </div>
</body>
</html>
`)
})

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
  console.log('URL:', req.url)
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
