import { useServiceTaskDel } from "@/hooks/useServiceTaskDel"
import { useTaskStore } from "@/store/task"
import { confirmAlert } from "@ui-components"

export const useMultipleDelete = () => {
  const { selected, clearAllSelected } = useTaskStore()
  const { deleteMultiTask } = useServiceTaskDel()
  const deleteAnyway = (cb?: () => void) => {
    deleteMultiTask(selected)
    cb && cb()
  }
  const onDeleteMany = (cb?: () => void) => {
    confirmAlert({
      message: 'Are you sure you want to delete these tasks ?',
      yes: () => {
        deleteAnyway(cb)
      }
    })
  }
  return {
    onDeleteMany
  }
}
