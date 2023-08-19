'use client'

import { ITaskQuery, taskGetByCond } from '@/services/task'
import { Task } from '@prisma/client'
import { useEffect, useState } from 'react'
import TaskStatus from '../../[orgID]/project/[projectId]/views/TaskStatus'
import TaskPriorityCell from '../../[orgID]/project/[projectId]/views/TaskPriorityCell'
import { messageError } from '@shared/ui'
import { MdOutlineRefresh } from 'react-icons/md'
import { useMyworkContext } from './context'
import MyworkLoading from './MyworkLoading'

interface IMyworkCardProps {
  title: string
  query: ITaskQuery
}
export default function MyworkCard({ title, query }: IMyworkCardProps) {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [total, setTotal] = useState(0)
  const [updateCounter, setUpdate] = useState(0)
  const { assigneeIds, projectId } = useMyworkContext()

  const getTask = (
    assigneeIds: string[],
    projectId: string,
    abortSignal: AbortSignal
  ) => {
    if (assigneeIds.length) {
      setLoading(true)

      const condition = { ...query, assigneeIds, projectId }

      taskGetByCond(condition, abortSignal).then(res => {
        const { status, data, total } = res.data
        if (status !== 200) {
          messageError(`Get ${title} tasks error`)
          setLoading(false)
          return
        }
        setLoading(false)
        setTotal(total)
        setTasks(data)
      })
    } else {
      setLoading(false)
      setTotal(0)
      setTasks([])
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    getTask(assigneeIds, projectId, controller.signal)
    return () => {
      controller.abort()
    }
  }, [assigneeIds, projectId])

  useEffect(() => {
    const controller = new AbortController()
    console.log('update', updateCounter)
    updateCounter > 0 && getTask(assigneeIds, projectId, controller.signal)
    return () => {
      controller.abort()
    }
  }, [updateCounter, assigneeIds, projectId])

  return (
    <div className="mw-card py-4">
      <h2 className="mw-card-title">
        <div>
          {title}{' '}
          <span className="text-xs w-6 h-6 p-1 rounded-md bg-white border inline-flex justify-center text-gray-500">
            {total}
          </span>
        </div>
        <MdOutlineRefresh
          onClick={() => setUpdate(u => u + 1)}
          className="mw-card-reload"
        />
      </h2>
      <MyworkLoading loading={loading} />
      <div className="space-y-2">
        {!loading &&
          tasks.map(task => {
            return (
              <div className="mw-task" key={task.id}>
                <div className="flex items-center gap-2">
                  {/* <TaskStatus taskId={task.id} value={task.taskStatusId || ''} /> */}
                  {task.title}
                  {/* <TaskPriorityCell taskId={task.id} value={task.priority} /> */}
                </div>
              </div>
            )
          })}
        {!loading && tasks.length < total && (
          <div className="bg-white py-1 text-center text-xs border rounded-md">
            And {total} more
          </div>
        )}

        {!loading && !tasks.length && (
          <div className="task-empty text-sm bg-red-200 rounded-md border border-red-200 shadow-sm shadow-red-300 p-3">
            {`🎃😎🥶 No tasks found! You're so lucky buddy !!`}
          </div>
        )}
      </div>
    </div>
  )
}
