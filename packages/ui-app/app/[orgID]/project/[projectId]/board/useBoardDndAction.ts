import { useTaskFilter } from '@/features/TaskFilter/context'
import { useBoardAction } from './useBoardAction'

export const useBoardDndAction = () => {
  const { moveTaskToAnotherGroup, rearrangeColumn } = useBoardAction()
  const { setGroupbyItems } = useTaskFilter()

  const dragItemToAnotherPosition = ({
    sourceColId,
    sourceIndex,
    destIndex
  }: {
    sourceColId: string
    sourceIndex: number
    destIndex: number
  }) => {
    setGroupbyItems(prev => {
      const cloned = structuredClone(prev)

      const column = cloned.find(c => c.id === sourceColId)

      if (!column) {
        console.log('empoty column')
        return cloned
      }

      const sourceItem = column.items[sourceIndex]
      column.items.splice(sourceIndex, 1)
      column.items.splice(destIndex, 0, sourceItem)
      // column.items[sourceIndex] = column.items[destIndex]
      // column.items[destIndex] = sourceItem

      return cloned
    })
  }

  const dragItemToAnotherColumn = ({
    sourceIndex,
    destIndex,
    sourceColId,
    destColId
  }: {
    sourceIndex: number
    destIndex: number
    sourceColId: string
    destColId: string
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
        moveTaskToAnotherGroup(sourceItem, destColumn.id)
      }, 200);

      return cloned
    })
  }

  const dragColumnToAnotherPosition = ({
    sourceIndex,
    destIndex
  }: {
    sourceIndex: number
    destIndex: number
  }) => {
    setGroupbyItems(prev => {
      const cloned = structuredClone(prev)

      const currentColumn = cloned[sourceIndex]
      cloned.splice(sourceIndex, 1)
      cloned.splice(destIndex, 0, currentColumn)

      setTimeout(() => {
        rearrangeColumn(sourceIndex, destIndex)
      }, 200);

      return cloned
    })
  }
  return {
    dragItemToAnotherPosition,
    dragItemToAnotherColumn,
    dragColumnToAnotherPosition
  }
}
