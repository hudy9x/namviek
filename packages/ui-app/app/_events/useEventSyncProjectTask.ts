import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useUser } from '@goalie/nextjs'

import { useGetTaskHandler } from '@/features/ProjectContainer/useGetTask'
import { messageInfo } from '@shared/ui'
import { Task } from '@prisma/client'
import { useTaskUpdate } from '../[orgID]/project/[projectId]/views/useTaskUpdate'
import { useServiceTaskDel } from '@/hooks/useServiceTaskDel'
import { useServiceTaskAdd } from '@/hooks/useServiceTaskAdd'

// @description
// it will be ran as an user create / delete / update a view
export const useEventSyncProjectTask = (projectId: string) => {
  const { user } = useUser()
  const { channelTeamCollab } = usePusher()
  const { fetchNCache } = useGetTaskHandler()
  const { updateLocalTask } = useTaskUpdate()
  const { deleteLocalTask } = useServiceTaskDel()
  const { createLocalTask } = useServiceTaskAdd()

  useEffect(() => {
    if (!user || !user.id) return

    const eventUpdateName = `projectTask:update-${projectId}`

    console.log('bind event:', eventUpdateName)
    channelTeamCollab &&
      channelTeamCollab.bind(eventUpdateName, (data: {
        triggerBy: string,
        data: Task,
        type: 'update' | 'delete' | 'create' | 'update-many'
      }) => {
        const { triggerBy, data: taskData, type } = data

        if (triggerBy === user.id) return

        console.log('data', taskData)
        if (type === 'update' && taskData) {
          // fetchNCache()
          updateLocalTask(taskData)
          return
          // messageInfo("trigger by " + triggerBy)
        }

        if (type === 'update-many') {
          fetchNCache()
          return
        }

        if (type === 'create') {
          if (!taskData || !taskData.id) {
            console.log('type:', type)
            console.log('taskDAta:', taskData)
            return
          }

          createLocalTask(taskData)
          return

        }

        if (type === 'delete') {
          if (!taskData || !taskData.id) {
            console.log('type:', type)
            console.log('taskDAta:', taskData)
            return
          }

          deleteLocalTask(taskData.id)
          return
        }
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventUpdateName)
    }
  }, [channelTeamCollab, user])
}
