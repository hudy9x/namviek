import { TaskContext } from './ListMode'
import { useContext } from 'react'
import ListRow from './ListRow'
import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'
import CreateSubTask from './ListCreateTask'
import { ExtendedTask } from '@/store/task'
import { Loading } from '@shared/ui'
import { useGetSubTasks } from './useGetSubTask'

export const SubTask = ({ task, groupId }: { task: ExtendedTask, groupId: string }) => {
  const { isOpen, subTasks, loading } = useContext(TaskContext)
  const { filter } = useTaskFilterContext()
  useGetSubTasks({ parentTaskId: task.id, projectId: task.projectId })

  if (loading && isOpen) {
    return <Loading className="px-3 py-2 text-sm" title="Loading ..." />
  }

  return isOpen ? (
    <div>
      {subTasks?.map(subTask => (
        subTask.parentTaskId && subTask.id !== task.id && <ListRow key={subTask.id} task={subTask as ExtendedTask} />
      ))}
      <CreateSubTask
        parentTaskId={task.id}
        type={filter.groupBy}
        groupId={groupId}
        title="Create new sub task"
      />
    </div>
  ) : (
    <></>
  )
}
