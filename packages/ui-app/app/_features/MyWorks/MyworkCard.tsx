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
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePlus
} from 'react-icons/hi2'

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
  const [collapse, setCollapse] = useState(false)

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
          {title} <span className="mw-card-total">{total}</span>
        </div>
        <div className="flex items-center gap-1">
          <MdOutlineRefresh
            onClick={() => setUpdate(u => u + 1)}
            className="mw-card-reload"
          />
          <HiOutlineChevronDown
            onClick={() => setCollapse(true)}
            className={`mw-card-reload ${collapse ? 'hidden' : ''}`}
          />
          <HiOutlineChevronUp
            onClick={() => setCollapse(false)}
            className={`mw-card-reload ${collapse ? '' : 'hidden'}`}
          />
        </div>
      </h2>
      <MyworkLoading loading={loading} />
      <div className={`space-y-2 ${collapse ? 'hidden' : ''}`}>
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
          <div className="mw-card-more">And {total} more</div>
        )}

        {!loading && !tasks.length && (
          <div className="task-empty text-sm bg-red-200 dark:bg-red-300 rounded-md border border-red-200 dark:border-red-400 shadow-sm shadow-red-300 dark:shadow-red-700 p-3 text-red-800">
            {`🎃😎🥶 No tasks found! You're so lucky buddy !!`}
          </div>
        )}
      </div>
    </div>
  )
}
