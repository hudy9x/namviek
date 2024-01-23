import { useEventTaskReorder } from '@/events/useEventTaskReorder'
import { useBoardDndAction } from './useBoardDndAction'
import { useUser } from '@goalie/nextjs'
import { useEventMoveTaskToOtherBoard } from '@/events/useEventMoveTaskToOtherBoard'

export const useBoardRealtimeUpdate = () => {
  const {
    dragColumnToAnotherPosition,
    dragItemToAnotherPosition,
    dragItemToAnotherColumn
  } = useBoardDndAction()

  const { user } = useUser()

  useEventTaskReorder(data => {
    if (!user || !user.id) return

    const message = data as {
      triggerBy: string
      sourceColId: string
      sourceIndex: number
      destIndex: number
    }

    if (user.id === message.triggerBy) {
      console.log('ignored re order')
      return
    }

    const { sourceIndex, destIndex, sourceColId } = message
    // just update item position on board view
    dragItemToAnotherPosition({
      sourceIndex,
      destIndex,
      sourceColId,
      syncServerDataAsWell: false
    })
    console.log(message, user)
  })

  useEventMoveTaskToOtherBoard(data => {
    if (!user || !user.id) return

    const message = data as {
      triggerBy: string
      sourceColId: string
      sourceIndex: number
      destIndex: number
      destColId: string
    }

    if (user.id === message.triggerBy) {
      console.log('ignored re order')
      return
    }

    const { sourceIndex, destColId, destIndex, sourceColId } = message
    // just update item position on board view
    dragItemToAnotherColumn({
      sourceColId,
      destColId,
      sourceIndex,
      destIndex,
      syncServerDataAsWell: false
    })
    console.log(message, user)
  })
}
