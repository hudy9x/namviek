import ListViewContainer from '@/features/Project/ListView'
import ListMode from './views/ListMode'
import TaskFilter from '@/features/TaskFilter'
import FilterAdvanced from '@/features/FilterAdvanced'

export default function TaskList() {
  return (
    <div className="relative">
      <div className='sticky top-0 left-0 z-20 px-4 border-b bg-white sm:flex items-center justify-between dark:bg-gray-900 dark:text-gray-300 dark:border-b-gray-800'>
        <FilterAdvanced />
      </div>
      {/* <TaskFilter /> */}
      {/* <ListMode /> */}
      <ListViewContainer />
    </div>
  )
}
