import TaskCheckbox from '@/components/TaskCheckbox'
import { ExtendedTask } from '@/store/task'
import TaskStatus from './TaskStatus'
import TaskActions from '@/features/TaskActions'
import ListCell from './ListCell'
import TaskAssignee from './TaskAssignee'
import { Loading } from '@shared/ui'

import { useMemo } from 'react'
import TaskTitle from './TaskTitle'
import ListCellCustomFieldValues from './ListCellCustomFieldValues'

export default function ListRow({ task }: { task: ExtendedTask }) {
  const isRandomId = task.id.includes('TASK-ID-RAND')
  const progress = useMemo(() => {
    const done = task.checklistDone || 0
    const todo = task.checklistTodos || 0
    const percent = (done / (todo + done)) * 100
    return isNaN(percent) ? 0 : Math.round(percent)
  }, [JSON.stringify(task)])

  return (
    <div
      className="px-3 py-2 text-sm sm:flex items-center group relative transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
      key={task.id}>
      <div className="flex items-center gap-2 dark:text-gray-300">
        <TaskCheckbox id={task.id} selected={task.selected} />
        {/* <StatusItem id={stt.id} /> */}
        <TaskStatus taskId={task.id} value={task.taskStatusId || ''} />

        {isRandomId ? <Loading enabled={true} spinnerSpeed="fast" /> : null}
        <TaskTitle id={task.id} projectId={task.projectId} title={task.title} />
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
        <ListCellCustomFieldValues taskId={task.id} data={task.customFields} />
        <ListCell width={40}>
        </ListCell>
      </div>
    </div>
  )
}
