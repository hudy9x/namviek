import { useDataFetcher } from "@/components/DataFetcher/useDataFetcher"
import { Button } from "@shared/ui"

export default function TestList() {
  const { data, isLoading, hasNextPage, cursor } = useDataFetcher()

  console.log('TESTIN GVIEW', data)
  return <div>
    {isLoading ? 'Loading data' : null}
    {!isLoading ? data.map((dt, dindex) => {
      return <div>
        {dindex} - {dt.title}
      </div>
    }) : null}

    {hasNextPage ?
      <Button onClick={() => {
        console.log('next cursor', cursor)
      }} title="Load more" />
      : null}

  </div>
}
