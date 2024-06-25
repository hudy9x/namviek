import { useContext } from 'react'
import StatusSelect from '@/components/StatusSelect'
import { useGetSubTasks } from '../../[orgID]/project/[projectId]/views/useGetSubTask'
import { Task } from '@prisma/client'
import { useTaskUpdate } from '../../[orgID]/project/[projectId]/views/useTaskUpdate'
import { SubTaskContext } from './context'

export const SubTaskList = ({
  projectId,
  taskId
}: {
  projectId: string
  taskId: string
}) => {
  const { subTasks } = useContext(SubTaskContext)
  const { updateTaskData } = useTaskUpdate()
  useGetSubTasks({ taskDetailId: taskId, projectId })

  const onUpdate = (taskStatusId: string, st: Task) => {
    updateTaskData({
      taskStatusId: taskStatusId,
      parentTaskId: taskId,
    })
  }

  return (
    <div>
      {subTasks.map(st => (
        <div
          key={st.id}
          className="group mb-2 flex justify-between rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 cursor-pointer">
          <div className="px-2.5 py-1.5 flex items-center">
            <p className="text-xs mr-2">{st.title}</p>
          </div>
          <StatusSelect
            value={st.taskStatusId || ''}
            onChange={val => onUpdate(val, st)}
          />
        </div>
      ))}
    </div>
  )
}
