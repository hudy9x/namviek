import './style.css'
import { OverviewProvider } from './context'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import OverviewContent from './OverviewContent'
import { taskGetByCond } from '@/services/task'
import { useParams } from 'next/navigation'
import { Task } from '@prisma/client'

export default function ProjectOverview() {
  const { projectId } = useParams()
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  })

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    console.log('call overview query', range)
    taskGetByCond({
      projectId,
      dueDate: [range?.from, range?.to]
    }).then(res => {
      const { status, data } = res.data

      if (status !== 200) {
        setTasks([])
        return
      }

      setTasks(data)
    })
  }, [range])

  return (
    <OverviewProvider
      value={{
        tasks,
        range,
        setRange
      }}>
      <OverviewContent />
    </OverviewProvider>
  )
}
