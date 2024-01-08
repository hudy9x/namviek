import TaskFilter from '@/features/TaskFilter'
import BoardContainer from './BoardContainer'

export default function BoardRoot() {
  return (
    <div>
      <TaskFilter />
      <BoardContainer />
    </div>
  )
}
