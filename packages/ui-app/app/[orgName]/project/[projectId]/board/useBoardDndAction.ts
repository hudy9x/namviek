import {
  ITaskFilterGroupbyItem,
  useTaskFilter
} from '@/features/TaskFilter/context'
import { useBoardAction } from './useBoardAction'
import { useBoardItemReorder } from './useBoardItemReorder'
import { serviceTask } from '@/services/task'
import { useUrl } from '@/hooks/useUrl'
import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'

export const useBoardDndAction = () => {
  const { moveTaskToAnotherGroup, rearrangeColumn } = useBoardAction()
  const { setGroupbyItems } = useTaskFilterContext()
  const { reorderTask } = useBoardItemReorder()
  const { projectId } = useUrl()

  const moveItemByIndex = ({
    column,
    sourceIndex,
    destIndex
  }: {
    column: ITaskFilterGroupbyItem
    sourceIndex: number
    destIndex: number
  }) => {
    const sourceItem = column.items[sourceIndex]

    column.items.splice(sourceIndex, 1)
    column.items.splice(destIndex, 0, sourceItem)
  }

  const dragItemToAnotherPosition = ({
    sourceColId,
    sourceIndex,
    destIndex,
    syncServerDataAsWell = true
  }: {
    sourceColId: string
    sourceIndex: number
    destIndex: number
    syncServerDataAsWell?: boolean
  }) => {
    setGroupbyItems(prev => {
      const cloned = structuredClone(prev)

      const column = cloned.find(c => c.id === sourceColId)

      // the column var will be updated as the below logic implemented
      // so we must save it first
      // cuz it will be used for scanning items that between source's index and dest's index
      const initialColumn = structuredClone(column)
      const isMovedUp = sourceIndex > destIndex

      if (!column) {
        console.log('empoty column')
        return cloned
      }

      moveItemByIndex({
        column,
        sourceIndex,
        destIndex
      })

      if (initialColumn) {
        const updatedTaskItems = reorderTask({
          isMovedUp,
          sourceIndex,
          destIndex,
          initialColumn
        })

        // syncServerDataAsWell used for triggering an http request to update task's order
        // on server side

        syncServerDataAsWell &&
          updatedTaskItems &&
          serviceTask
            .reorder({ updatedOrder: updatedTaskItems, projectId })
            .then(res => {
              console.log('reorder success')
              console.log(res)
            })
      }

      return cloned
    })
  }

  const dragItemToAnotherColumn = ({
    sourceIndex,
    destIndex,
    sourceColId,
    destColId,
    syncServerDataAsWell = true
  }: {
    sourceIndex: number
    destIndex: number
    sourceColId: string
    destColId: string
    syncServerDataAsWell?: boolean
  }) => {
    setGroupbyItems(prev => {
      const cloned = structuredClone(prev)

      const column = cloned.find(c => c.id === sourceColId)
      const destColumn = cloned.find(c => c.id === destColId)

      if (!column || !destColumn) {
        console.log('empty column')
        return cloned
      }

      const sourceItem = column.items[sourceIndex]
      column.items.splice(sourceIndex, 1)
      destColumn.items.splice(destIndex, 0, sourceItem)

      // delay update for 200ms
      // otherwise it causes a

      setTimeout(() => {
        moveTaskToAnotherGroup(sourceItem, destColumn.id, syncServerDataAsWell)
      }, 200)

      return cloned
    })
  }

  const dragColumnToAnotherPosition = ({
    sourceIndex,
    destIndex,
    syncServerDataAsWell = true
  }: {
    sourceIndex: number
    destIndex: number
    syncServerDataAsWell?: boolean
  }) => {
    setGroupbyItems(prev => {
      const cloned = structuredClone(prev)

      const currentColumn = cloned[sourceIndex]
      cloned.splice(sourceIndex, 1)
      cloned.splice(destIndex, 0, currentColumn)

      syncServerDataAsWell &&
        setTimeout(() => {
          rearrangeColumn(sourceIndex, destIndex)
        }, 200)

      return cloned
    })
  }
  return {
    dragItemToAnotherPosition,
    dragItemToAnotherColumn,
    dragColumnToAnotherPosition
  }
}
