'use client'

import { useUser } from '@goalie/nextjs'
import * as PusherPushNotifications from '@pusher/push-notifications-web'
import { useEffect } from 'react'

let beamsClient: PusherPushNotifications.Client
let beamsTokenProvider: PusherPushNotifications.TokenProvider
let ready = false
try {
  beamsClient = new PusherPushNotifications.Client({
    instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID || ''
  })
  beamsTokenProvider = new PusherPushNotifications.TokenProvider({
    url: `${process.env.NEXT_PUBLIC_BE_GATEWAY}api/buzzer/pusher-authentication`
  })
  ready = true
} catch (error) {
  console.warn('Pusher Instance Id is missing')
}


export default function PushNotification() {
  const { user } = useUser()
  useEffect(() => {
    if (user && user.id) {
      try {
        beamsClient.stop().then(() => {
          beamsClient
            .start()
            .then(() => beamsClient.setUserId(user.id, beamsTokenProvider))
            // .then(() => beamsClient.addDeviceInterest('project'))
            // .then(() => beamsClient.addDeviceInterest('all'))
            .then(() => {
              // messageSuccess('Registered pusher')
              console.log('Successfully registered and subscribed!')
            })
            .catch(console.error)
        })
      } catch (error) {
        console.log('Pusher beam missing configuration or configuration invalid')
      }
    }
  }, [JSON.stringify(user)])

  return <></>
}
