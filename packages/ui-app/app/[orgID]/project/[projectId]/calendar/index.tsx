import TaskFilter from '@/features/TaskFilter'
import CalMonthContainer from './CalMonthContainer'
import './style.css'

export default function Calendar() {
  const date = new Date()
  const view = 'month'
  return (
    <div>
      <TaskFilter />
      {view === 'month' ? <CalMonthContainer date={date} /> : null}
    </div>
  )
}
