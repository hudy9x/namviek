
import FilterAdvanced from '@/features/FilterAdvanced'
import GridViewContainer from './GridViewContainer'

export default function GridContent() {
  return (
    <div className="relative">
      <div className='sticky top-0 left-0 z-20 px-4 border-b bg-white sm:flex items-center justify-between dark:bg-gray-900 dark:text-gray-300 dark:border-b-gray-800'>
        <FilterAdvanced />
      </div>
      <GridViewContainer />

    </div>
  )
}
