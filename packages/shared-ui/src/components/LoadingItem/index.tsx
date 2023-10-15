import { Loading } from '@shared/ui'

interface ILoadingItem {
  isLoading: boolean
}

export default function LoadingItem({ isLoading }: ILoadingItem) {
  return (
    <>
      {isLoading ? (
        <div className="text-sm px-3 py-2 text-gray-500 flex items-center gap-3">
          <span className="w-4 h-4">
            <Loading />
          </span>
          <span>Loading ...</span>
        </div>
      ) : null}
    </>
  )
}
