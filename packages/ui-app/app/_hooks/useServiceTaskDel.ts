import { taskDelete } from '@/services/task'
import { useTaskStore } from '@/store/task'
import { useParams } from 'next/navigation'

export const useServiceTaskDel = () => {
  const { projectId } = useParams()
  const { delTask } = useTaskStore()

  const deleteTask = (id: string) => {
    console.log('delete task called', id)
    delTask(id)

    taskDelete({
      projectId,
      id
    })
  }

  return {
    deleteTask
  }
}
