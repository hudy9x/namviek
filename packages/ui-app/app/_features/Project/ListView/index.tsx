'use client'

import { useTaskStore } from '@/store/task'
import { Avatar, Loading } from '@shared/ui'
import TaskMultipleActions from '@/features/TaskMultipleActions'

import TaskCheckAll from './TaskCheckAll'
import ListCell from './ListCell'
import ListCreateTask from './ListCreateTask'
import ListRow from './ListRow'
import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'
import CreateField from '@/features/CustomField/CreateField'
import ListCellCustomFields from './ListCellCustomFields'
import ListRowContainer from './ListRowContainer'

export default function ListViewContainer() {
  const {
    groupByLoading,
    groupByItems,
    filter,
    isGroupbyPriority,
    isGroupbyAssignee,
    isGroupbyStatus
  } = useTaskFilterContext()

  const { tasks, taskLoading } = useTaskStore()

  return (
    <div className="pb-[300px]">
      {groupByItems.map(group => {
        return (
          <div
            className="bg-white m-4 dark:bg-gray-900 rounded-md border dark:border-gray-800 relative "
            key={group.id}>
            <div className="px-3 py-2 border-b dark:border-b-gray-800 sticky top-[40px] bg-white dark:bg-gray-900 rounded-t-md flex items-center z-10">
              <div
                style={{ color: group.color }}
                className="flex gap-2 items-center text-xs uppercase font-bold">
                <TaskCheckAll groupId={group.id} />
                <div
                  className={`status-name flex items-center ${groupByLoading ? 'loading' : ''
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
            </div>
            <div className="divide-y dark:divide-gray-800">

              {!taskLoading ?
                <ListRowContainer group={group} tasks={tasks} />
                : null
              }

              {/* {!taskLoading && */}
              {/*   tasks.map(task => { */}
              {/*     if (isGroupbyStatus && task.taskStatusId !== group.id) { */}
              {/*       if (group.id === 'NONE' && group.items.includes(task.id)) { */}
              {/*         return <ListRow key={task.id} task={task} /> */}
              {/*       } */}
              {/*       return null */}
              {/*     } */}
              {/**/}
              {/*     if (isGroupbyAssignee) { */}
              {/*       if ( */}
              {/*         task.assigneeIds.length && */}
              {/*         !task.assigneeIds.includes(group.id) */}
              {/*       ) { */}
              {/*         return null */}
              {/*       } */}
              {/**/}
              {/*       if (!task.assigneeIds.length && group.id !== 'NONE') { */}
              {/*         return null */}
              {/*       } */}
              {/*     } */}
              {/**/}
              {/*     if (isGroupbyPriority && task.priority !== group.id) { */}
              {/*       return null */}
              {/*     } */}
              {/**/}
              {/**/}
              {/*     return <ListRow key={task.id} task={task} /> */}
              {/*   })} */}

              <ListCreateTask type={filter.groupBy} groupId={group.id} />
            </div>
          </div>
        )
      })}
      <TaskMultipleActions />
    </div>
  )
}
