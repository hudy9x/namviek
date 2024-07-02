import { Task } from '@prisma/client'
import { useParams } from 'next/navigation'
import TaskAssignee from 'packages/ui-app/app/[orgName]/project/[projectId]/views/TaskAssignee'
import TaskPriorityCell from 'packages/ui-app/app/[orgName]/project/[projectId]/views/TaskPriorityCell'
import TaskStatus from 'packages/ui-app/app/[orgName]/project/[projectId]/views/TaskStatus'
// import { taskGetAll } from 'packages/ui-app/services/task'
import { useEffect, useState } from 'react'

import { taskGetAll } from '@/services/task'

export default function OverviewTask() {
  const { projectId } = useParams()
  const [tasks, setTasks] = useState<Task[]>([])
  const tabs = ['today', 'overdue', 'upcoming']
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    taskGetAll(projectId).then(res => {
      console.log(res)
      const { status, data } = res.data

      if (status !== 200) {
        return
      }

      setTasks(data)
    })
  }, [])
  return (
    <div className="rounded-md border shadow-sm bg-white mt-3 col-span-3">
      <div className="flex items-center border-b px-4 gap-2">
        {tabs.map((tab, idx) => {
          const active =
            idx === selected
              ? 'border-indigo-500 text-gray-600'
              : 'border-transparent'

          return (
            <h2
              key={tab}
              className={`capitalize text-xs text-gray-400 py-2 px-1 border-b-2 ${active}`}>
              {tab}
            </h2>
          )
        })}
      </div>
      <div className="px-4 pb-4 max-h-[250px] overflow-y-auto space-y-2 py-2">
        {tasks.map(task => {
          const { title, assigneeIds, priority, id, taskStatusId } = task
          return (
            <div
              key={id}
              className="flex items-center gap-2 text-sm text-gray-500 justify-between group cursor-pointer">
              <div className="group-hover:text-indigo-600">
                <div className="flex items-center gap-2">
                  {taskStatusId ? (
                    <TaskStatus taskId={id} value={taskStatusId} />
                  ) : null}
                  {title}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[150px]">
                  <TaskAssignee taskId={id} uids={assigneeIds} />
                </div>
                <div className="w-[80px]">
                  <TaskPriorityCell taskId={id} value={priority} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
