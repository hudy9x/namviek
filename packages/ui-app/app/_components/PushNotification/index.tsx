'use client'

import { useUser } from '@goalie/nextjs'
import * as PusherPushNotifications from '@pusher/push-notifications-web'
import { messageSuccess } from '@shared/ui'
import { useEffect } from 'react'

const beamsClient = new PusherPushNotifications.Client({
  instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID || ''
})

const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
  url: `${process.env.NEXT_PUBLIC_BE_GATEWAY}api/buzzer/pusher-authentication`
})

export default function PushNotification() {
  const { user } = useUser()
  useEffect(() => {
    if (user) {
      beamsClient.stop().then(() => {
        beamsClient
          .start()
          .then(() => beamsClient.setUserId(user.id, beamsTokenProvider))
          // .then(() => beamsClient.addDeviceInterest('project'))
          // .then(() => beamsClient.addDeviceInterest('all'))
          .then(() => {
            messageSuccess('Registered pusher')
            console.log('Successfully registered and subscribed!')
          })
          .catch(console.error)
      })
    }
  }, [JSON.stringify(user)])

  return <></>
}
