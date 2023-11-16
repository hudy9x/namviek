/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'dotenv/config'
import express, { Application } from 'express'
import cors from 'cors'
import './lib/redis'
import Routes from './routes'

const app: Application = express()

app.get('/check-health', (req, res) => {
  res.send(`🚀🎃:e: Site available ${new Date()} `)
})

app.use(
  cors({
    exposedHeaders: ['Authorization', 'RefreshToken']
  })
)
app.use(express.json())

app.use('/api', Routes)

const port = process.env.PORT || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
