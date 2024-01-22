import { ITaskFilterGroupbyItem } from '@/features/TaskFilter/context'
import {
  taskIdMap,
  updateTaskOrderInMap
} from '@/hooks/useGenTaskMappingObject'
import localforage from 'localforage'
import { useParams } from 'next/navigation'


export const useBoardItemReorder = () => {
  const { projectId } = useParams()



  const getUpdatedTaskOrderItem = ({
    isMovedUp,
    initialColumn,
    sourceIndex,
    destIndex
  }: {
    isMovedUp: boolean
    initialColumn: ITaskFilterGroupbyItem
    sourceIndex: number
    destIndex: number
  }) => {
    console.log('=======================')
    const colItems = initialColumn.items
    const [from, to] = isMovedUp
      ? [destIndex, sourceIndex]
      : [sourceIndex, destIndex]

    const items = colItems.slice(from, to + 1)
    const updatedItems: [string, number][] = []

    const addUpdateItem = (id: string, order: number) => {
      updatedItems.push([id, order])
    }

    // update task's order as moving up
    if (isMovedUp) {
      console.log('moving up')
      const lastTaskId = items[items.length - 1]
      const firstTaskId = items[0]
      const firstTask = taskIdMap.get(firstTaskId)

      if (!firstTask) {
        console.log('no first task')
        return
      }

      addUpdateItem(lastTaskId, firstTask.order)

      const lastIndexItem = items.length - 1
      console.log('items', items)
      for (let i = 0; i < lastIndexItem; i++) {
        const item = items[i]
        const nextItem = items[i + 1]
        const nextTask = taskIdMap.get(nextItem)

        if (!nextTask) {
          console.log('no next task')
          return
        }

        addUpdateItem(item, nextTask.order)
      }

      // update task's order as moving down
    } else {
      console.log('moving down')
      const firstTaskId = items[0]
      const lastTaskId = items[items.length - 1]
      const lastTask = taskIdMap.get(lastTaskId)

      if (!lastTask) {
        console.log('no last task')
        return
      }

      addUpdateItem(firstTaskId, lastTask.order)

      for (let i = 1; i < items.length; i++) {
        const item = items[i]
        const prevItem = items[i - 1]
        const prevTask = taskIdMap.get(prevItem)

        if (!prevTask) {
          console.log('no prev task')
          return
        }

        addUpdateItem(item, prevTask.order)
      }
    }

    return updatedItems
  }

  const clearCachedTaskData = () => {
    const key = `TASKLIST_${projectId}`
    localforage.removeItem(key)
  }

  const reorderTask = ({
    isMovedUp,
    sourceIndex,
    destIndex,
    initialColumn
  }: {
    isMovedUp: boolean
    initialColumn: ITaskFilterGroupbyItem
    sourceIndex: number
    destIndex: number
  }) => {
    const updatedTaskItems = getUpdatedTaskOrderItem({
      isMovedUp,
      sourceIndex,
      destIndex,
      initialColumn
    })

    console.log('updatedtaskitem', updatedTaskItems)
    if (updatedTaskItems) {
      clearCachedTaskData()
      updateTaskOrderInMap(updatedTaskItems)
      // serviceTask
      //   .reorder({ updatedOrder: updatedTaskItems, projectId })
      //   .then(res => {
      //     console.log('reorder success')
      //     console.log(res)
      //   })
    }

    return updatedTaskItems
  }

  return {
    reorderTask
  }
}
