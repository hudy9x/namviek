import ListMode from './views/ListMode'
import TaskImport from './TaskImport'

export default function TaskList() {
  return (
    <div className='relative'>
      <div className="sticky top-0 left-0 z-10 py-2 px-4 border-b bg-white flex items-center justify-between">
        <div>
          <input className="text-sm" placeholder="Search ..." />
        </div>

        <div>
          <TaskImport />
        </div>
      </div>
      <ListMode />
    </div>
  )
}
