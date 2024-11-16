'use client'

import { useTaskStore } from '@/store/task'
import TaskMultipleActions from '@/features/TaskMultipleActions'

import ListRowContainer from './ListRowContainer'

export default function ListViewContainer() {
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
