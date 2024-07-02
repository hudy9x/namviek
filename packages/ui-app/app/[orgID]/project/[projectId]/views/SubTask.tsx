
import { useContext } from 'react'
import ListRow from './ListRow'
import CreateSubTask from './ListCreateTask'
import { ExtendedTask } from '@/store/task'
import { Loading } from '@shared/ui'
import { useGetSubTasks } from './useGetSubTask'
import { SubTaskContext } from '@/features/SubTask/context'

export const SubTask = ({ task }: { task: ExtendedTask }) => {
  const { isOpen, subTasks, loading } = useContext(SubTaskContext)
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
        title="Create new sub task"
      />
    </div>
  ) : (
    <></>
  )
}
