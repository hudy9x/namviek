import { Router } from 'express'
import { AuthRequest } from '../../types'

import { authMiddleware } from '../../middlewares'
import { generateBuzzerToken, notifyToUsers } from '../../lib/buzzer'
import { pusherAuthorizeChannel } from '../../lib/pusher-server'

const router = Router()
const mainRouter = Router()

mainRouter.use('/buzzer', router)

// It means GET:/api/examplestorage
router.get('/pusher-authentication', async (req, res) => {
  // const { id: uid } = req.authen
  const userId = req.query['user_id'] as string
  console.log(`pusher user: ${userId} generated`)

  res.send(JSON.stringify(generateBuzzerToken(userId)))
})

router.post('/channel-auth', async (req, res) => {
  try {
    const socketId = req.body.socket_id
    const channel = req.body.channel_name
    // const presenceData = {
    //   user_id: 'unique_user_id',
    //   user_info: { name: 'Mr Channels', twitter_id: '@pusher' }
    // }
    // This authenticates every user. Don't do this in production!

    console.log('authorize channel')

    const authResponse = pusherAuthorizeChannel(
      socketId,
      channel
      // presenceData
    )
    res.send(authResponse)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/pusher/test', [authMiddleware], async (req: AuthRequest, res) => {
  const { id: uid } = req.authen
  console.log('send to ', uid)

  notifyToUsers(uid, {
    web: {
      notification: {
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Vanamo_Logo.png/600px-Vanamo_Logo.png?20120915115534',
        title: 'New notification',
        body: 'Hey friend, i sent you a notification about the new upcomming task'
      }
    }
  })
    .then(publishResponse => {
      console.log('Just published:', publishResponse.publishId)
      res.status(200)
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500)
    })
})

// It means POST:/api/example
// router.post('/example', (req: AuthRequest, res) => {
//   console.log('auth user', req.authen)
//   res.json({ status: 200 })
// })

export default mainRouter
