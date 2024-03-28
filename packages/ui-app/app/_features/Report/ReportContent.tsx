'use client'

import { taskGetByCond } from '@/services/task'
import { useOrgMemberStore } from '@/store/orgMember'
import { useProjectStore } from '@/store/project'
import { extractDueDate } from '@shared/libs'
import { useEffect, useState } from 'react'
import { ReportProvider } from './context'
import { Task } from '@prisma/client'
import ReportLayout from './ReportLayout'
import useTaskFilterContext from '../TaskFilter/useTaskFilterContext'

export default function ReportContent() {
  const { filter } = useTaskFilterContext()
  const { projects } = useProjectStore()
  const { orgMembers } = useOrgMemberStore()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const { date, dateOperator, startDate: d1, endDate: d2 } = filter
    const { startDate, endDate } = extractDueDate({
      date: date,
      dateOperator: dateOperator,
      start: d1,
      end: d2
    })

    setLoading(true)
    projects.length &&
      orgMembers.length &&
      taskGetByCond(
        {
          projectIds: projects.map(p => p.id),
          dueDate: [startDate || 'null', endDate || 'null']
        },
        controller.signal
      )
        .then(res => {
          const { data } = res.data
          setLoading(false)
          setTasks(data)
        })
        .catch(err => {
          setLoading(false)
        })

    return () => {
      controller.abort()
      setLoading(false)
    }
  }, [filter, projects, orgMembers])
  return (
    <ReportProvider
      value={{
        loading,
        setLoading,
        tasks
      }}>
      <ReportLayout />
    </ReportProvider>
  )
}
