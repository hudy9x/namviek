import ListMode from './views/ListMode'
import TaskImport from './TaskImport'

export default function TaskList() {
  return (
    <div>
      <TaskImport />
      <ListMode />
    </div>
  )
}
