import { useDataFetcher } from "@/components/DataFetcher/useDataFetcher"
import { Button } from "@shared/ui"

export default function TestList() {
  const { data, hasNextPage, fetchNextPage } = useDataFetcher()
  return <div>
    {data.map((dt, dindex) => {
      return <div key={dindex}>
        {dindex + 1} - {dt.title}
      </div>
    })}

    {hasNextPage ?
      <Button onClick={() => {
        fetchNextPage()
      }} title="Load more" />
      : null}

  </div>
}
