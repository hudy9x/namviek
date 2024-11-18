import { useDataFetcher } from "@/components/DataFetcher/useDataFetcher"
import { Button } from "@shared/ui"

export default function ListLoadMore() {
  const {
    fetchNextPage,
    hasNextPage,
    isLoading,
    totalRecords,
    restRecords,
  } = useDataFetcher()

  console.log('restRecords loadmore', restRecords, totalRecords)

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
