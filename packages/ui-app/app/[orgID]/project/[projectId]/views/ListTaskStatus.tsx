import { TaskStatus as TaskStatusMd } from '@prisma/client'
import TaskCheckbox from '../../../../_components/TaskCheckbox'
import TaskAssignee from './TaskAssignee'
import TaskDate from './TaskDate'
import TaskPriorityCell from './TaskPriorityCell'
import MemberAvatar from '../../../../_components/MemberAvatar'
import TaskPoint from './TaskPoint'
import TaskStatus from './TaskStatus'
import { Loading } from '@shared/ui'
import ListCreateTask from './ListCreateTask'
import { useTaskStore } from '../../../../../store/task'
import { useState } from 'react'
import ListTaskStatusHeader from './ListTaskStatusHeader'
import ListCell from './ListCell'

export function ListTaskStatus({ stt }: { stt: TaskStatusMd }) {
  const { tasks, taskLoading } = useTaskStore()
  const [checkedAll, setCheckedAll] = useState(false)
  return (
    <div className="bg-white mb-4 rounded-md border mx-4 mt-4" key={stt.id}>
      <div style={{ color: stt.color }}>
        <ListTaskStatusHeader status={stt} onCheckedChange={setCheckedAll} />
      </div>
      <div className="divide-y">
        {taskLoading ? (
          <div className="text-sm px-3 py-2 text-gray-500 flex items-center gap-3">
            <span className="w-4 h-4">
              <Loading />
            </span>
            <span>Loading ...</span>
          </div>
        ) : null}

        <div className="relative">
          {!taskLoading &&
            tasks.map(task => {
              if (task.taskStatusId !== stt.id) return null
              return (
                <div
                  key={task.id}
                  className="px-3 py-2 text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TaskCheckbox id={stt.id} value={checkedAll} />
                    {/* <StatusItem id={stt.id} /> */}
                    <TaskStatus taskId={task.id} value={task.taskStatusId} />
                    {task.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                    <ListCell width={150}>
                      <TaskAssignee taskId={task.id} uids={task.assigneeIds} />
                    </ListCell>
                    <ListCell width={75}>
                      <TaskPriorityCell
                        taskId={task.id}
                        value={task.priority}
                      />
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
          <ListCreateTask type="status" groupId={stt.id} />
          {checkedAll ? (
            <div className="absolute bg-slate-400 opacity-50 top-0 bottom-0 left-0 right-0 z-[1]"></div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
