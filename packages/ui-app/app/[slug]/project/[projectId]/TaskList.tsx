import ListMode from './views/ListMode'
import TaskFilter from '@/features/TaskFilter'

export default function TaskList() {
  return (
    <div className="relative">
      <TaskFilter />
      <ListMode />
    </div>
  )
}
