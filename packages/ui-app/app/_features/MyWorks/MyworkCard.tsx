'use client'

import { ITaskQuery, taskGetByCond } from '@/services/task'
import { Task } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { messageError } from '@shared/ui'
import { MdOutlineRefresh } from 'react-icons/md'
import { useMyworkContext } from './context'
import MyworkLoading from './MyworkLoading'
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePlus
} from 'react-icons/hi2'
import { format } from 'date-fns'
import { useProjectStore } from '@/store/project'
import MyworkTaskList from './MyworkTaskList'
import MyworkTaskPaginate from './MyworkTaskPaginate'

interface IMyworkCardProps {
  title: string
  query: ITaskQuery
}
export default function MyworkCard({ title, query }: IMyworkCardProps) {
  const limit = query.take || 5
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [total, setTotal] = useState(0)
  const [updateCounter, setUpdate] = useState(0)
  const { assigneeIds, projectId } = useMyworkContext()
  const [collapse, setCollapse] = useState(false)
  const { projects } = useProjectStore()
  const [page, setPage] = useState(1)
  const paginate = useMemo(() => {
    const take = limit * page
    const skip = page === 1 ? 0 : take - limit

    return { take, skip }
  }, [page])
  const maxPage = Math.ceil(total / limit)

  const projectIds = useMemo(() => {
    return projects.map(p => p.id)
  }, [JSON.stringify(projects)])

  const getTask = (
    { assigneeIds,
      projectId,
      abortSignal,
      take,
      skip,
    }: {
      assigneeIds: string[],
      projectId: string,
      abortSignal: AbortSignal,
      take?: number
      skip?: number
    }
  ) => {
    if (assigneeIds.length) {
      setLoading(true)

      let condition = { ...query, assigneeIds }

      if (projectId !== 'all') {
        condition = { ...condition, projectId }
      } else {
        condition = { ...condition, projectIds, projectId: '' }
      }

      if (take && skip && take > 0 && skip > -1) {
        condition = { ...condition, take, skip }
      }

      console.log('condition', condition)

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

  // fetch data first time
  useEffect(() => {
    const controller = new AbortController()
    const { take, skip } = paginate
    getTask({
      assigneeIds,
      projectId,
      take,
      skip,
      abortSignal: controller.signal
    })

    return () => {
      controller.abort()
    }
  }, [JSON.stringify(assigneeIds), projectId, JSON.stringify(projectIds), JSON.stringify(paginate)])

  // reload data
  useEffect(() => {
    const controller = new AbortController()
    const { take, skip } = paginate
    updateCounter > 0 && getTask({
      assigneeIds,
      projectId,
      abortSignal: controller.signal,
      take,
      skip
    })
    return () => {
      controller.abort()
    }
  }, [updateCounter, JSON.stringify(assigneeIds), projectId, JSON.stringify(projectIds), JSON.stringify(paginate)])

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
      <div className={`space-y-2 ${collapse ? 'hidden' : ''}`}>
        <MyworkLoading loading={loading} />
        <MyworkTaskList loading={loading} tasks={tasks} />
        <MyworkTaskPaginate
          enable={!loading && !!tasks.length}
          page={page}
          maxPage={maxPage}
          onNext={() => setPage(page => page + 1)}
          onPrev={() => setPage(page => page + -1)} />
      </div>
    </div>
  )
}
