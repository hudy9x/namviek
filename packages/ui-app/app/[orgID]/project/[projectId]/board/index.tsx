import TaskFilter from '@/features/TaskFilter'
import BoardContainer from './BoardContainer'
import TaskMultipleActions from '@/features/TaskMultipleActions'

export default function BoardRoot() {
  return (
    <div>
      <TaskFilter />
      <BoardContainer />
      <TaskMultipleActions />
    </div>
  )
}
