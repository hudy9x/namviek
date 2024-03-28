'use client'

import { useTaskStore } from '../../../../../store/task'

import TaskCheckAll from './TaskCheckAll'
import ListCell from './ListCell'
import { Avatar, Loading } from '@shared/ui'
import ListCreateTask from './ListCreateTask'
import { useTaskFilter } from '@/features/TaskFilter/context'
import TaskMultipleActions from '@/features/TaskMultipleActions'
import ListRow from './ListRow'
import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'

export default function ListMode() {
  const {
    groupByLoading,
    groupByItems,
    filter,
    isGroupbyPriority,
    isGroupbyAssignee,
    isGroupbyStatus
  } = useTaskFilterContext()

  const { tasks, taskLoading } = useTaskStore()
  console.log('listmode render', taskLoading)
  // const { groupedByStatusButNotMeetCondition } = useListFilterCondition({
  //   isGroupbyStatus
  // })

  return (
    <div className="pb-[300px]">
      {groupByItems.map(group => {
        return (
          <div
            className="bg-white dark:bg-gray-900 mb-4 rounded-md border dark:border-gray-800 mx-4 relative mt-4"
            key={group.id}>
            <div className="px-3 py-2 border-b dark:border-b-gray-800 sticky top-[40px] bg-white dark:bg-gray-900 rounded-t-md flex items-center justify-between z-10">
              <div
                style={{ color: group.color }}
                className="flex gap-2 items-center text-xs uppercase font-bold">
                <TaskCheckAll groupId={group.id} />
                <div
                  className={`status-name flex items-center ${
                    groupByLoading ? 'loading' : ''
                  }`}>
                  {isGroupbyAssignee ? (
                    <div className="mr-2 inline-block">
                      <Avatar
                        size="md"
                        name={group.name}
                        src={group.icon || ''}
                      />
                    </div>
                  ) : null}
                  <span
                    className={`${isGroupbyAssignee ? 'text-gray-500' : ''}`}>
                    {group.name}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
                <ListCell width={150}>Assignee</ListCell>
                <ListCell width={75}>Priority</ListCell>
                <ListCell width={50}>Point</ListCell>
                <ListCell width={110}>Duedate</ListCell>
                <ListCell width={110}>Progress</ListCell>
                {/* <ListCell width={100}>Created by</ListCell> */}
              </div>
            </div>
            <div className="divide-y dark:divide-gray-800">
              {taskLoading ? (
                <Loading className="px-3 py-2 text-sm" title="Loading ..." />
              ) : null}

              {!taskLoading &&
                tasks.map(task => {
                  if (isGroupbyStatus && task.taskStatusId !== group.id) {
                    if (group.id === 'NONE' && group.items.includes(task.id)) {
                      return <ListRow key={task.id} task={task} />
                    }
                    return null
                  }

                  if (isGroupbyAssignee) {
                    if (
                      task.assigneeIds.length &&
                      !task.assigneeIds.includes(group.id)
                    ) {
                      return null
                    }

                    if (!task.assigneeIds.length && group.id !== 'NONE') {
                      return null
                    }
                  }

                  if (isGroupbyPriority && task.priority !== group.id) {
                    return null
                  }

                  return <ListRow key={task.id} task={task} />
                })}
              <ListCreateTask type={filter.groupBy} groupId={group.id} />
            </div>
          </div>
        )
      })}
      <TaskMultipleActions />
    </div>
  )
}
