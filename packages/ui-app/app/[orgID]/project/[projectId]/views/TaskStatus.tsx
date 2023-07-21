import { taskUpdate } from 'packages/ui-app/services/task'
import StatusSelect from '../../../../_components/StatusSelect'
import { useParams } from 'next/navigation'
import { useTaskStore } from 'packages/ui-app/store/task'
import { messageError, messageSuccess } from '@shared/ui'
import { useUser } from '@goalie/nextjs'

export default function TaskStatus({
  taskId,
  value
}: {
  taskId: string
  value: string
}) {
  const {user} = useUser()
  const { projectId } = useParams()
  const { updateTask } = useTaskStore()

  const onUpdateStatus = (statusId: string) => {
    console.log(statusId)
    updateTask({
      id: taskId,
      taskStatusId: statusId,
      updatedBy: user?.id
    })
    taskUpdate({
      id: taskId,
      projectId,
      taskStatusId: statusId
    })
      .then(result => {
        const { status } = result
        if (status !== 200) {
          messageError('update status error')
          return
        }
        messageSuccess('update status success')
        console.log()
        console.log(result)
      })
      .catch(error => {
        console.log(error)
        messageError('update status error')
      })
  }
  return (
    <StatusSelect
      className="task-status"
      value={value}
      onChange={onUpdateStatus}
    />
  )
}
