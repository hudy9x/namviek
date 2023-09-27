import { LoadingSpinner } from 'packages/shared-ui/src/components/Loading'

export default function ProjectContentLoading() {
  return (
    <div
      className="absolute top-0 left-0 w-full z-20 flex items-center justify-center"
      style={{ height: 'calc(100vh - 83px)' }}>
      <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-md shadow-lg dark:shadow-gray-900 ">
        <div className="w-4 h-4">
          <LoadingSpinner />
        </div>
        <span>Loading ...</span>
      </div>
    </div>
  )
}
