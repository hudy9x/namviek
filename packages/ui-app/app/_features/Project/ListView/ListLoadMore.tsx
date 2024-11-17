import { useDataFetcher } from "@/components/DataFetcher/useDataFetcher"
import { Button } from "@shared/ui"

export default function ListLoadMore() {
  const fetchNextPage = useDataFetcher(state => state.fetchNextPage)
  const hasNextPage = useDataFetcher(state => state.hasNextPage)

  if (!hasNextPage) return null

  return <div >
    <Button onClick={() => {
      fetchNextPage()
    }} title="Load more" />

  </div>
}
