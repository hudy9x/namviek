import TaskCheckbox from '@/components/TaskCheckbox'
import { ExtendedTask } from '@/store/task'
import TaskStatus from './TaskStatus'
import TaskActions from '@/features/TaskActions'
import ListCell from './ListCell'
import TaskAssignee from './TaskAssignee'
import TaskPriorityCell from './TaskPriorityCell'
import TaskPoint from './TaskPoint'
import TaskDate from './TaskDate'
import ProgressBar from '@/components/ProgressBar'
import { useParams, useRouter } from 'next/navigation'
import { useUrl } from '@/hooks/useUrl'
import { Loading, messageWarning } from '@shared/ui'

import TaskTypeCell from './TaskTypeCell'

export default function ListRow({ task }: { task: ExtendedTask }) {
  const params = useParams()
  const { replace } = useRouter()
  const { getSp } = useUrl()
  const isRandomId = task.id.includes('TASK-ID-RAND')

  return (
    <div
      className="px-3 py-2 text-sm sm:flex items-center justify-between group relative transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
      key={task.id}>
      <div className="flex items-center gap-2 dark:text-gray-300">
        <TaskCheckbox id={task.id} selected={task.selected} />
        {/* <StatusItem id={stt.id} /> */}
        <TaskStatus taskId={task.id} value={task.taskStatusId || ''} />

        {isRandomId ? <Loading enabled={true} spinnerSpeed="fast" /> : null}
        <div
          className="cursor-pointer"
          key={task.id}
          onClick={() => {
            if (isRandomId) {
              messageWarning('This task has been creating by server !')
              return
            }
            replace(
              `${params.orgID}/project/${task.projectId}?mode=${getSp(
                'mode'
              )}&taskId=${task.id}`
            )
          }}
        // href={`${params.orgID}/project/${task.projectId}?mode=${getSp(
        //   'mode'
        // )}&taskId=${task.id}`}
        >
          <div className="w-full">{task.title}</div>
        </div>
        <TaskActions
          className="opacity-0 group-hover:opacity-100 transition-all duration-100"
          taskId={task.id}
        />
      </div>
      <div className="mt-2 sm:mt-0 flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
        <ListCell className="absolute top-3 right-2 sm:top-0 sm:left-0 sm:relative sm:w-[150px]">
          <TaskAssignee
            className="no-name"
            taskId={task.id}
            uids={task.assigneeIds}
          />
        </ListCell>
        <ListCell width={115}>
          <TaskTypeCell type={task.type} taskId={task.id} />
        </ListCell>
        <ListCell width={75} className="hidden sm:block">
          <TaskPriorityCell taskId={task.id} value={task.priority} />
        </ListCell>
        <ListCell className="hidden sm:w-[50px] sm:block">
          <TaskPoint taskId={task.id} value={task.taskPoint} />
        </ListCell>
        <ListCell
          className={`ml-6 sm:ml-0 sm:w-[110px]`}>
          <TaskDate
            toNow={true}
            taskId={task.id}
            date={task.dueDate ? new Date(task.dueDate) : null}
          />
        </ListCell>
        <ListCell className="hidden sm:block" width={70}>
          <ProgressBar color="green" progress={task.progress || 0} />
        </ListCell>
      </div>
    </div>
  )
}
