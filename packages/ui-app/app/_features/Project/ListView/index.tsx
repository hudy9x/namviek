'use client'

import { useTaskStore } from '@/store/task'
import TaskMultipleActions from '@/features/TaskMultipleActions'

// import TaskCheckAll from './TaskCheckAll'
// import ListCell from './ListCell'
// import ListCreateTask from './ListCreateTask'
// import ListRow from './ListRow'
// import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'
// import CreateField from '@/features/CustomField/CreateField'
// import ListCellCustomFields from './ListCellCustomFields'
import ListRowContainer from './ListRowContainer'

export default function ListViewContainer() {
  // const {
  //   groupByLoading,
  //   groupByItems,
  //   filter,
  //   isGroupbyPriority,
  //   isGroupbyAssignee,
  //   isGroupbyStatus
  // } = useTaskFilterContext()
  //
  const { tasks, taskLoading } = useTaskStore()

  return (
    <div className="pb-[300px]">
      <div className="divide-y dark:divide-gray-800">

        {!taskLoading ?
          <ListRowContainer tasks={tasks} />
          : null
        }

        {/* <ListCreateTask type={filter.groupBy} groupId={group.id} /> */}
      </div>
      <TaskMultipleActions />
    </div>
  )
}
