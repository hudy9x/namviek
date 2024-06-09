import { useCallback, useEffect } from 'react'
import { useNotificationStore } from '@/store/notification'
import { notificationGet } from '@/services/notification'
import { useParams } from 'next/navigation'
import { messageError } from '@shared/ui'
import localforage from 'localforage'
import { useUser } from '@goalie/nextjs'

export const useGetNotificationHandler = () => {
  const { user } = useUser()
  const { orgID } = useParams()
  const { addAllNotifications } = useNotificationStore()

  const key = `NOTIFICATIONLIST_${user?.id}`

  const fetchNCache = useCallback(() => {
    const controller = new AbortController()

    if (!user?.id) return

    notificationGet(controller.signal).then(res => {
      const { data, status, error } = res.data

      console.log({ fetchNotification: data, status, error })

      if (status !== 200) {
        addAllNotifications([])
        localforage.removeItem(key)
        messageError(error)
        return
      }

      localforage.setItem(key, data)
      setTimeout(() => {
        addAllNotifications(data)
      }, 300)
    })

    return () => {
      controller.abort()
    }
  }, [orgID, key])

  return {
    fetchNCache
  }
}

function useFillNotificationFromCache() {
  const { orgID } = useParams()
  const { addAllNotifications } = useNotificationStore()
  const { user } = useUser()
  const key = `NOTIFICATIONLIST_${user?.id}`

  useEffect(() => {
    localforage
      .getItem(key)
      .then(val => {
        if (val) {
          addAllNotifications(val as [])
        }
      })
      .catch(err => {
        console.log('errpr loading cached task', err)
      })
  }, [orgID])
}

export default function useGetNotification() {
  const { fetchNCache } = useGetNotificationHandler()
  useFillNotificationFromCache()

  useEffect(() => {
    fetchNCache()
  }, [])
}
