import TaskImport from '@/features/TaskImport'

export default function TaskFilter() {
  return (
    <div className="sticky top-0 left-0 z-10 py-2 px-4 border-b bg-white flex items-center justify-between">
      <div>
        <input className="text-sm" placeholder="Search ..." />
      </div>

      <div>
        <TaskImport />
      </div>
    </div>
  )
}
