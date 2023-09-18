import TaskFilter from '@/features/TaskFilter'
import CalMonthContainer from './CalMonthContainer'
import './style.css'
import { CalendarProvider } from './context'
import { useState } from 'react'

export default function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth())
  const d = new Date()
  const date = new Date(d.getFullYear(), month, 15)
  const view = 'month'
  return (
    <div>
      <CalendarProvider value={{ month, setMonth }}>
        <TaskFilter />
        {view === 'month' ? <CalMonthContainer date={date} /> : null}
      </CalendarProvider>
    </div>
  )
}
