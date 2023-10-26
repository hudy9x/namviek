import { Router } from 'express'
import { AuthRequest } from '../../types'
import PushNotifications from '@pusher/push-notifications-server'
import { authMiddleware } from '../../middlewares'

const beamsClient = new PushNotifications({
  instanceId: process.env.PUSHER_INSTANCE_ID,
  secretKey: process.env.PUSHER_SECRET_KEY
})
const router = Router()

// It means GET:/api/examplestorage
router.get('/pusher/beams-auth', async (req, res) => {
  // const { id: uid } = req.authen
  const userIDInQueryParam = req.query['user_id'] as string

  // console.log('uid2', uid)
  console.log('uid query', userIDInQueryParam)
  //
  // if (uid != userIDInQueryParam) {
  //   res.status(401)
  // } else {
  const beamsToken = beamsClient.generateToken(userIDInQueryParam)
  // res.json({ data: beamsToken })
  res.send(JSON.stringify(beamsToken))
  // }
})

router.get('/pusher/test', [authMiddleware], async (req: AuthRequest, res) => {
  const { id: uid } = req.authen
  console.log('send to ', uid)
  beamsClient
    .publishToUsers([uid], {
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

export default router
