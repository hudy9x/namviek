
import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@goalie/nextjs'
import { projectGet } from '@/services/project'
import { useUrl } from '@/hooks/useUrl'
import { useProjectStore } from '@/store/project'
import localforage from 'localforage'

export const useEventUserProjectUpdate = () => {
  const searchParams = useSearchParams()
  const { orgID } = useUrl()
  const { user } = useUser()
  const taskId = searchParams.get('taskId')
  const { channelTeamCollab } = usePusher()
  const { setLoading, addAllProject } = useProjectStore()
  const keyList = `PROJECT_LIST_${orgID}`

  useEffect(() => {
    if (!user || !user.id) return
    const eventName = `userProject:update.${user.id}`

    console.log('bind event:', eventName)
    channelTeamCollab &&
      channelTeamCollab.bind(eventName, (data: unknown) => {

        console.log('data:', eventName, data)

        projectGet({
          orgId: orgID,
          isArchive: false
        }).then(result => {
          const { data, status } = result.data

          if (status !== 200) return

          setLoading(false)
          addAllProject(data)

          localforage.setItem(keyList, data)
        })
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab, taskId, user])
}
