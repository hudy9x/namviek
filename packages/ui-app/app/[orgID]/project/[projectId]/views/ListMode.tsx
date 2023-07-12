'use client'

import { useEffect } from 'react'
import { useProjectStatusStore } from '../../../../../store/status'
import { taskGetAll } from '../../../../../services/task'
import { useParams } from 'next/navigation'
import { messageError } from '@shared/ui'
import { useTaskStore } from '../../../../../store/task'
import StatusItem from '../../../../_components/StatusItem'
import TaskCheckbox from '../../../../_components/TaskCheckbox'
import TaskCheckAll from './TaskCheckAll'
import TaskAssignee from './TaskAssignee'
import TaskDate from './TaskDate'
import TaskPriorityCell from './TaskPriorityCell'
import MemberAvatar from '../../../../_components/MemberAvatar'
import ListCell from './ListCell'

export default function ListMode() {
  const { projectId } = useParams()
  const { statuses } = useProjectStatusStore()
  const { tasks, addAllTasks } = useTaskStore()

  useEffect(() => {
    taskGetAll(projectId)
      .then(res => {
        const { data, status, error } = res.data
        if (status !== 200) {
          addAllTasks([])
          messageError(error)
          return
        }
        addAllTasks(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="pb-[100px]">
      {statuses.map(stt => {
        return (
          <div
            className="bg-white mb-4 rounded-md border mx-4 relative mt-4"
            key={stt.id}>
            <div className="px-3 py-2 border-b sticky top-0 bg-white rounded-t-md flex items-center justify-between z-10">
              <div
                style={{ color: stt.color }}
                className="flex gap-2 items-center text-xs uppercase font-bold">
                <TaskCheckAll />
                {stt.name}
              </div>
              <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
                <ListCell width={150}>Assignee</ListCell>
                <ListCell width={75}>Priority</ListCell>
                <ListCell width={50}>Point</ListCell>
                <ListCell width={110}>Duedate</ListCell>
                <ListCell width={100}>Created by</ListCell>
              </div>
            </div>
            <div className="divide-y">
              {tasks.map(task => {
                if (task.taskStatusId !== stt.id) return null
                return (
                  <div
                    className="px-3 py-2 text-sm flex items-center justify-between"
                    key={task.id}>
                    <div className="flex items-center gap-2">
                      <TaskCheckbox id={stt.id} />
                      <StatusItem id={stt.id} />
                      {task.title}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <ListCell width={150}>
                        <TaskAssignee
                          taskId={task.id}
                          uids={task.assigneeIds}
                        />
                      </ListCell>
                      <ListCell width={75}>
                        <TaskPriorityCell
                          taskId={task.id}
                          value={task.priority}
                        />
                      </ListCell>
                      <ListCell width={50}>
                        {task.taskPoint ? task.taskPoint : '-'}
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
            </div>
          </div>
        )
      })}
    </div>
  )
}
