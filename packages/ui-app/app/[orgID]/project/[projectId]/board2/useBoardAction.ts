import { useTaskFilter } from '@/features/TaskFilter/context'

export const useBoardAction = () => {
  const { setGroupbyItems } = useTaskFilter()

  const reorderTaskInSameColumn = ({
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

  const moveTaskToAnotherColumn = ({
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
      // column.items[sourceIndex] = column.items[destIndex]
      // column.items[destIndex] = sourceItem
      //
      console.log('moved task to column')
      console.log(sourceItem, destColumn.id)

      return cloned
    })
  }

  const reorderColumn = ({
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

      return cloned
    })
  }
  return {
    reorderTaskInSameColumn,
    moveTaskToAnotherColumn,
    reorderColumn
  }
}
