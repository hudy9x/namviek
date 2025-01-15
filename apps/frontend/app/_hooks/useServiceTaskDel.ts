import { taskDelete, taskDeletes } from '@/services/task'
import { useTaskStore } from '@/store/task'
import { useParams } from 'next/navigation'

export const useServiceTaskDel = () => {
  const { projectId } = useParams()
  const { delTask, delTasks } = useTaskStore()

  const deleteTask = (id: string) => {
    console.log('delete task called', id)
    delTask(id)

    taskDelete({
      projectId,
      id
    })
  }

  const deleteMultiTask = (ids: string[]) => {
    delTasks(ids)
    taskDeletes({
      projectId,
      ids
    })
  }

  const deleteLocalTask = (id: string) => {
    delTask(id)
  }

  return {
    deleteMultiTask,
    deleteLocalTask,
    deleteTask
  }
}
