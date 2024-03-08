import { useTaskStore } from "@/store/task"

export const useMultipleDelete = () => {
  const { selected, clearAllSelected } = useTaskStore()
  const onDeleteMany = () => {
    console.log('1', selected)
  }
  return {
    onDeleteMany
  }
}
