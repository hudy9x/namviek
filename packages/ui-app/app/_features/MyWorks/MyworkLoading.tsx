import { Loading } from '@shared/ui'

export default function MyworkLoading({ loading }: { loading: boolean }) {
  if (!loading) return null
  return (
    <div className="p-4 bg-white border rounded-md flex items-center justify-center gap-2">
      <div className="w-4 h-4">
        <Loading />
      </div>
      <span className="text-sm text-gray-500">Loading ...</span>
    </div>
  )
}
