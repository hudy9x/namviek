'use client'

import TaskMultipleActions from '@/features/TaskMultipleActions'
import ListRowContainer from './ListRowContainer'
import DataFetcher from '@/components/DataFetcher'
import { useDataFetcher } from '@/components/DataFetcher/useDataFetcher'
import ListDataFilter from './ListDataFilter'

export default function ListViewContainer() {

  return (

    <div className="pb-[300px]">
      <ListDataFilter>
        <DataFetcher>
          <div className="divide-y dark:divide-gray-800">
            <TaskData />
          </div>
        </DataFetcher>
      </ListDataFilter>
      <TaskMultipleActions />
    </div>

  )
}

function TaskData() {
  const data = useDataFetcher(state => state.data)

  return (
    <ListRowContainer tasks={data} />
  )
}

