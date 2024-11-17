'use client'

import { useTaskStore } from '@/store/task'
import TaskMultipleActions from '@/features/TaskMultipleActions'

import ListRowContainer from './ListRowContainer'
import DataFetcher from '@/components/DataFetcher'
import { useDataFetcher } from '@/components/DataFetcher/useDataFetcher'
import TestList from './TestList'
import ListDataFilter from './ListDataFilter'

// export default function ListViewContainer() {
//   const { tasks, taskLoading } = useTaskStore()
//
//   return (
//     <div className="pb-[300px]">
//       <div className="divide-y dark:divide-gray-800">
//
//         {!taskLoading ?
//           <ListRowContainer tasks={tasks} />
//           : null
//         }
//
//       </div>
//       <TaskMultipleActions />
//     </div>
//   )
// }

export default function ListViewContainer() {
  // const { tasks, taskLoading } = useTaskStore()

  return (
    <div className="pb-[300px]">
      <ListDataFilter>
        <DataFetcher>
          <TestList />
        </DataFetcher>
      </ListDataFilter>
    </div>
  )
}

