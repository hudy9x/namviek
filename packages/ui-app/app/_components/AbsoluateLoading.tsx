import { LoadingSpinner } from 'packages/shared-ui/src/components/Loading'

export default function AbsoluteLoading({
  title = 'Loading ...',
  enabled = false
}: {
  title?: string
  enabled: boolean
}) {
  if (!enabled) return null
  return (
    <div className="absolute z-10 top-0 left-0 w-full h-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white border px-2 py-1 rounded-md shadow-md flex items-center gap-2">
        <div className="w-4 h-4 text-gray-500">
          <LoadingSpinner />
        </div>
        <span>{title}</span>
      </div>
    </div>
  )
}
