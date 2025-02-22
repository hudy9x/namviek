'use client'

import { useDataFetcher } from '@/components/DataFetcher/useDataFetcher'
import CustomFieldMultiAction from '@/features/CustomFieldMultiAction'
import GridDataFilter from './GridDataFilter'
import GridRowContainer from './GridRowContainer'
import EventGridChanges from '@/events/EventGridChanges'

export default function GridViewContainer() {

  return (

    <div className="pb-[300px]">
      <GridDataFilter>
        <div className="divide-y dark:divide-gray-800">
          <TaskData />
        </div>
        <CustomFieldMultiAction />
        <EventGridChanges />
      </GridDataFilter>
    </div>

  )
}

function TaskData() {
  const data = useDataFetcher(state => state.data)
  console.log('data', data)
  return (
    <GridRowContainer rows={data} />
  )
}

