import { useDataFetcher } from "@/components/DataFetcher/useDataFetcher"
import { Button } from "@ui-components"

export default function GridLoadMore() {
  const {
    fetchNextPage,
    hasNextPage,
    isLoading,
    restRecords,
  } = useDataFetcher()

  if (!hasNextPage) return null

  return <div className="w-full px-2 py-1 bg-white dark:bg-gray-800 border-b flex items-center justify-between">
    <Button size="sm"
      ghost
      disabled={isLoading}
      onClick={() => {
        fetchNextPage()
      }} title={isLoading ? 'Loading ...' : 'Load more'} />

    <div className="text-xs">
      <span>Rest records: {restRecords}</span>
    </div>

  </div>
}
