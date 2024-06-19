import { useContext } from 'react'
import { TaskContext } from '../../[orgID]/project/[projectId]/views/ListMode'
import StatusSelect from '@/components/StatusSelect'
import { useGetSubTasks } from '../../[orgID]/project/[projectId]/views/useGetSubTask'
import { Task } from '@prisma/client'
import { useTaskUpdate } from '../../[orgID]/project/[projectId]/views/useTaskUpdate'

export const SubTaskList = ({
  projectId,
  parentTaskId
}: {
  projectId: string
  parentTaskId: string
}) => {
  const { subTasks } = useContext(TaskContext)
  const { updateTaskData } = useTaskUpdate()
  useGetSubTasks({ parentTaskId, projectId })

  const onUpdate = (taskStatusId: string, st: Task) => {
    updateTaskData({
      taskStatusId: taskStatusId,
      parentTaskId,
    })
  }

  return (
    <div>
      {subTasks.map(st => (
        <div
          key={st.id}
          className="group flex justify-between mb-1 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 cursor-pointer">
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
