'use client'

import { useTaskStore } from '../../../../../store/task'
import TaskCheckbox from '../../../../_components/TaskCheckbox'

import TaskCheckAll from './TaskCheckAll'
import TaskAssignee from './TaskAssignee'
import TaskDate from './TaskDate'
import TaskPriorityCell from './TaskPriorityCell'
import MemberAvatar from '../../../../_components/MemberAvatar'
import ListCell from './ListCell'
import TaskPoint from './TaskPoint'
import TaskStatus from './TaskStatus'
import { Avatar, Loading } from '@shared/ui'
import ListCreateTask from './ListCreateTask'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import TaskActions from '@/features/TaskActions'
import ProgressBar from '@/components/ProgressBar'
import { useTaskFilter } from '@/features/TaskFilter/context'
import TaskMultipleActions from '@/features/TaskMultipleActions'
import { useUrl } from '@/hooks/useUrl'

export default function ListMode() {
  const {
    groupByLoading,
    groupByItems,
    filter,
    isGroupbyPriority,
    isGroupbyAssignee,
    isGroupbyStatus
  } = useTaskFilter()

  const { tasks, taskLoading } = useTaskStore()
  const params = useParams()
  const { getSp } = useUrl()


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
              {taskLoading || groupByLoading ? (
                <Loading className="px-3 py-2 text-sm" title="Loading ..." />
              ) : null}

              {!taskLoading &&
                tasks.map(task => {
                  if (isGroupbyStatus && task.taskStatusId !== group.id)
                    return null

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

                  return (
                    <div
                      className="px-3 py-2 text-sm sm:flex items-center justify-between group relative"
                      key={task.id}>
                      <div className="flex items-center gap-2 dark:text-gray-300">
                        <TaskCheckbox id={task.id} selected={task.selected} />
                        {/* <StatusItem id={stt.id} /> */}
                        <TaskStatus
                          taskId={task.id}
                          value={task.taskStatusId || ''}
                        />
                        {/* {task.id} */}
                        <Link
                          key={task.id}
                          href={`${params.orgID}/project/${task.projectId}?mode=${getSp('mode')}&taskId=${task.id}`}>
                          <div className="w-full">{task.title}</div>
                        </Link>
                        <TaskActions
                          className="opacity-0 group-hover:opacity-100 transition-all duration-100"
                          taskId={task.id}
                        />
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
                        <ListCell className="absolute top-3 right-2 sm:top-0 sm:left-0 sm:relative sm:w-[150px]">
                          <TaskAssignee
                            className="no-name"
                            taskId={task.id}
                            uids={task.assigneeIds}
                          />
                        </ListCell>
                        <ListCell width={75} className="hidden sm:block">
                          <TaskPriorityCell
                            taskId={task.id}
                            value={task.priority}
                          />
                        </ListCell>
                        <ListCell className="hidden sm:w-[50px] sm:block">
                          <TaskPoint taskId={task.id} value={task.taskPoint} />
                        </ListCell>
                        <ListCell className="ml-6 sm:ml-0 sm:w-[110px]">
                          <TaskDate
                            toNow={true}
                            taskId={task.id}
                            date={task.dueDate ? new Date(task.dueDate) : null}
                          />
                        </ListCell>
                        <ListCell className="hidden sm:block" width={110}>
                          <ProgressBar
                            color="green"
                            progress={task.progress || 0}
                          />
                        </ListCell>
                      </div>
                    </div>
                  )
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
