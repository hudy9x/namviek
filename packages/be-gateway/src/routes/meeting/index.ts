import { Router } from 'express'
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'

const apiKey = process.env.LIVEKIT_API_KEY
const apiSecret = process.env.LIVEKIT_API_SECRET
let wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

if (!wsUrl) {
  wsUrl = 'wss://sample.livekit.cloud'
  console.log('⚠️  Livekit configuration is missing')
}

const router = Router()
const mainRouter = Router()

const roomService = new RoomServiceClient(wsUrl, apiKey, apiSecret)

// router.use([authMiddleware])

mainRouter.use('/meeting', router)

router.post('/room', async (req: AuthRequest, res) => {
  const { name } = req.body as { name: string }
  try {
    const room = await roomService.createRoom({
      name,
      emptyTimeout: 10 * 60, // 10 min
      maxParticipants: 30
    })

    res.json({
      data: room
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/room', async (req: AuthRequest, res) => {
  const rooms = await roomService.listRooms()
  res.json({ data: rooms })
})

router.delete('/room/:name', async (req: AuthRequest, res) => {
  const { name } = req.params as { name: string }

  try {
    await roomService.deleteRoom(name)
    res.json({ data: 'room deleted' })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/join', async (req: AuthRequest, res) => {

  const { room, username } = req.query as {
    room: string
    username: string
  }

  if (!room) {
    return res.status(500).send('Missing room')
  }

  if (!username) {
    return res.status(500).send('Missing username')
  }

  if (!apiKey || !apiSecret || !wsUrl) {
    return res.status(500).send('Server misconfigured')
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username })

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true })

  console.log('return access token')

  res.json({
    token: at.toJwt()
  })
})

// It means GET:/api/example
router.get('/get-participants', (req: AuthRequest, res) => {
  const { room, username } = req.query as {
    room: string
    username: string
  }

  if (!room) {
    return res.status(500).send('Missing room')
  }

  if (!username) {
    return res.status(500).send('Missing username')
  }

  if (!apiKey || !apiSecret || !wsUrl) {
    return res.status(500).send('Server misconfigured')
  }

  const at = new AccessToken(apiKey, apiSecret, { identity: username })

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true })

  console.log('return access token')

  res.json({
    token: at.toJwt()
  })
})

// It means POST:/api/example
router.post('/example', (req: AuthRequest, res) => {
  console.log('auth user', req.authen)
  res.json({ status: 200 })
})

export default mainRouter
