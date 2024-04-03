'use client'

import { useEffect, useState } from 'react'
import ExportFilter from './ExportFilter'
import { useExportFilter } from './context'
import './style.css'
import { taskExportByCond } from '@/services/task'
import { fromDateStringToDateObject, to23h59m } from '@shared/libs'
import { useProjectStore } from '@/store/project'
import { Task, TaskType } from '@prisma/client'
import { format } from 'date-fns'
import { useOrgMemberStore } from '@/store/orgMember'
import { useOrgMemberGet } from '@/services/organizationMember'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export interface ITaskExport {
  id: string
  projectId: string
  projectName: string
  title: string
  assignee?: string
  dueDate?: string
  priority?: string
  taskPoint?: number
  taskStatusName?: string
}

export const columns = [
  { title: 'Project', name: 'projectName' },
  { title: 'Task name', name: 'title' },
  { title: 'Type', name: 'type' },
  { title: 'Assignee', name: 'assignee' },
  { title: 'Due date', name: 'dueDate' },
  { title: 'Priority', name: 'priority' },
  { title: 'Point', name: 'taskPoint' },
  { title: 'Status', name: 'taskStatusName' }
]

export default function SettingExport() {
  const [tasks, setTasks] = useState<ITaskExport[]>([])
  const { projects } = useProjectStore()
  const { orgMembers } = useOrgMemberStore()
  const { filter } = useExportFilter()
  const { orgID } = useParams()
  useOrgMemberGet()

  const getDueDate = ({
    dateOperator,
    date,
    start,
    end
  }: {
    dateOperator: string
    date: string
    start: Date | undefined
    end: Date | undefined
  }) => {
    if (date === 'date-range') {
      start && start.setHours(0)
      end && to23h59m(end)

      return { startDate: start, endDate: end }
    }

    if (date === 'not-set') {
      return { startDate: 'not-set', endDate: 'not-set' }
    }

    const { startDate, endDate } = fromDateStringToDateObject(
      dateOperator,
      date
    )

    return {
      startDate,
      endDate
    }
  }

  useEffect(() => {
    const {
      projectIds,
      dateOperator,
      date,
      startDate: start,
      endDate: end
    } = filter

    const { startDate, endDate } = getDueDate({
      date,
      dateOperator,
      start,
      end
    })

    const controller = new AbortController()
    taskExportByCond(
      {
        projectIds,
        dueDate: [startDate || 'null', endDate || 'null']
      },
      controller.signal
    )
      .then(res => {
        const { status, data } = res.data
        const result = data.map((dt: Task) => {
          const project = projects.find(p => p.id === dt.projectId)
          const mem = orgMembers.find(m => m.id === dt.assigneeIds[0])

          const ext = {
            projectName: project ? project.name : null,
            assignee: mem ? mem.name : null,
            dueDate: dt.dueDate
              ? format(new Date(dt.dueDate), 'yyyy-MMM-dd')
              : null
          }

          return { ...dt, ...ext }
        })

        setTasks(result)
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })

    return () => {
      controller.abort()
    }
  }, [JSON.stringify(filter), JSON.stringify(orgMembers)])

  return (
    <div>
      <ExportFilter data={tasks} />
      <div
        className="px-4 pt-3 overflow-y-auto"
        style={{ height: `calc(100vh - 125px)` }}>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              {columns.map(col => {
                return (
                  <th className="" key={col.name}>
                    {col.title}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => {
              const projectId = task.projectId
              return (
                <tr key={task.id}>
                  <td className="text-center">{index + 1}</td>
                  {columns.map(col => {
                    const key = col.name as keyof ITaskExport
                    const align = col.name === 'title' ? '' : 'text-center'
                    let value = task[key]
                    if (col.name === 'type') {
                      value = value || TaskType.TASK
                    }
                    return (
                      <td className={`${align}`} key={col.name}>
                        {key === 'projectName' ? (
                          <Link
                            className="text-indigo-500 hover:underline"
                            href={`${orgID}/project/${projectId}?mode=task`}>
                            {value}
                          </Link>
                        ) : (
                          value
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
