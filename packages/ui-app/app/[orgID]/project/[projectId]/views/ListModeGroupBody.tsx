import TaskCheckbox from '@/components/TaskCheckbox'
import { useTaskStore } from '@/store/task'
import { Task } from '@prisma/client'
import { Loading } from '@shared/ui'
import React from 'react'
import TaskStatus from './TaskStatus'
import ListCell from './ListCell'
import TaskAssignee from './TaskAssignee'
import TaskPriorityCell from './TaskPriorityCell'
import TaskPoint from './TaskPoint'
import TaskDate from './TaskDate'
import MemberAvatar from '@/components/MemberAvatar'
import TaskActions from '@/features/TaskActions'
import ListCreateTask from './ListCreateTask'
import { useTaskSelectContext } from '../TaskSelectContext'

export default function ListModeGroupBody({
  tasks: groupTasks,
  groupExpr
}: {
  tasks: Task[]
  groupExpr: any
}) {
  const { taskLoading } = useTaskStore()
  const { selectedTasks, toggleTaskSelect } = useTaskSelectContext()
  const selectedTaskIds = selectedTasks.map(task => task.id)
  // console.log({ groupExpr, groupTasks })

  return (
    <div className="divide-y dark:divide-gray-800">
      {taskLoading ? (
        <div className="text-sm px-3 py-2 text-gray-500 flex items-center gap-3">
          <span className="w-4 h-4">
            <Loading />
          </span>
          <span>Loading ...</span>
        </div>
      ) : null}

      {!taskLoading &&
        groupTasks.map(task => {
          if (!task.taskStatusId) return null
          const value = selectedTaskIds.includes(task.id)
          return (
            <div
              className="px-3 py-2 text-sm flex items-center justify-between group"
              key={task.id}>
              <div className="flex items-center gap-2 dark:text-gray-300">
                <div onClick={() => toggleTaskSelect(task)}>
                  <TaskCheckbox id={task.id} checked={value} />
                </div>
                {/* <StatusItem id={stt.id} /> */}
                <TaskStatus taskId={task.id} value={task.taskStatusId} />
                {task.title}
                <TaskActions
                  className="opacity-0 group-hover:opacity-100 transition-all duration-100"
                  taskId={task.id}
                />
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
                <ListCell width={150}>
                  <TaskAssignee taskId={task.id} uids={task.assigneeIds} />
                </ListCell>
                <ListCell width={75}>
                  <TaskPriorityCell taskId={task.id} value={task.priority} />
                </ListCell>
                <ListCell width={50}>
                  <TaskPoint taskId={task.id} value={task.taskPoint} />
                </ListCell>
                <ListCell width={110}>
                  <TaskDate
                    taskId={task.id}
                    date={task.dueDate ? new Date(task.dueDate) : null}
                  />
                </ListCell>
                <ListCell width={100}>
                  <MemberAvatar uid={task.createdBy} />
                </ListCell>
              </div>
            </div>
          )
        })}
      <ListCreateTask groupType="status" groupExpr={groupExpr} />
    </div>
  )
}
