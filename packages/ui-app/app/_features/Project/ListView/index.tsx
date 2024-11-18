'use client'

import ListRowContainer from './ListRowContainer'
import { useDataFetcher } from '@/components/DataFetcher/useDataFetcher'
import ListDataFilter from './ListDataFilter'

export default function ListViewContainer() {

  return (

    <div className="pb-[300px]">
      <ListDataFilter>
        <div className="divide-y dark:divide-gray-800">
          <TaskData />
        </div>
      </ListDataFilter>
    </div>

  )
}

function TaskData() {
  const data = useDataFetcher(state => state.data)
  return (
    <ListRowContainer tasks={data} />
  )
}

