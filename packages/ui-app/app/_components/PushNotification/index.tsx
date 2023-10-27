'use client'

import { useUser } from '@goalie/nextjs'
import * as PusherPushNotifications from '@pusher/push-notifications-web'
import { useEffect } from 'react'

const beamsClient = new PusherPushNotifications.Client({
  instanceId: '7cd6fb43-a8b9-4196-85b5-46e86f96861a'
})

const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
  url: `${process.env.NEXT_PUBLIC_BE_GATEWAY}api/pusher/beams-auth`
})

export default function PushNotification() {
  const { user } = useUser()
  useEffect(() => {
    if (user) {
      beamsClient.stop().then(() => {
        console.log('start register beam token', user.id)
        beamsClient
          .start()
          .then(() => beamsClient.setUserId(user.id, beamsTokenProvider))
          // .then(() => beamsClient.addDeviceInterest('project'))
          // .then(() => beamsClient.addDeviceInterest('all'))
          .then(() => console.log('Successfully registered and subscribed!'))
          .catch(console.error)
      })
    }
  }, [JSON.stringify(user)])

  return <></>
}
