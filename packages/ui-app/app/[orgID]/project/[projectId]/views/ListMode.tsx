'use client'

import { useProjectStatusStore } from '../../../../../store/status'
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
import { Loading } from '@shared/ui'
import ListCreateTask from './ListCreateTask'
// import List from 'react-virtualized/dist/commonjs/List'
//
// const list = new Array(10).fill(1).map((r, ind) => `title ${ind + 1}`)
// function rowRenderer({ key, index, isScrolling, isVisible, style }) {
//   return (
//     <div key={key} style={style}>
//       {list[index]}
//     </div>
//   )
// }

export default function ListMode() {
  const { statuses, statusLoading } = useProjectStatusStore()
  const { tasks, taskLoading } = useTaskStore()

  return (
    <div className="pb-[300px]">
      {/* <List */}
      {/*   width={300} */}
      {/*   height={300} */}
      {/*   rowCount={100} */}
      {/*   rowHeight={20} */}
      {/*   rowRenderer={rowRenderer} */}
      {/* /> */}
      {statuses.map(stt => {
        return (
          <div
            className="bg-white dark:bg-gray-900 mb-4 rounded-md border dark:border-gray-800 mx-4 relative mt-4"
            key={stt.id}>
            <div className="px-3 py-2 border-b dark:border-b-gray-800 sticky top-[45px] bg-white dark:bg-gray-900 rounded-t-md flex items-center justify-between z-10">
              <div
                style={{ color: stt.color }}
                className="flex gap-2 items-center text-xs uppercase font-bold">
                <TaskCheckAll />
                <div
                  className={`status-name ${statusLoading ? 'loading' : ''}`}>
                  {stt.name}
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase font-medium text-gray-500">
                <ListCell width={150}>Assignee</ListCell>
                <ListCell width={75}>Priority</ListCell>
                <ListCell width={50}>Point</ListCell>
                <ListCell width={110}>Duedate</ListCell>
                <ListCell width={100}>Created by</ListCell>
              </div>
            </div>
            <div className="divide-y dark:divide-gray-800">
              {taskLoading ? (
                <div className="text-sm px-3 py-2 text-gray-500 flex items-center gap-3">
                  <span className="w-4 h-4">
                    <Loading />
                  </span>
                  <span>Loading ...</span>
                </div>
              ) : null}

              {!taskLoading &&
                tasks.map(task => {
                  if (task.taskStatusId !== stt.id) return null
                  return (
                    <div
                      className="px-3 py-2 text-sm flex items-center justify-between"
                      key={task.id}>
                      <div className="flex items-center gap-2 dark:text-gray-300">
                        <TaskCheckbox id={stt.id} />
                        {/* <StatusItem id={stt.id} /> */}
                        <TaskStatus
                          taskId={task.id}
                          value={task.taskStatusId}
                        />
                        {task.title}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
                        <ListCell width={150}>
                          <TaskAssignee
                            taskId={task.id}
                            uids={task.assigneeIds}
                          />
                        </ListCell>
                        <ListCell width={75}>
                          <TaskPriorityCell
                            taskId={task.id}
                            value={task.priority}
                          />
                        </ListCell>
                        <ListCell width={50}>
                          <TaskPoint taskId={task.id} value={task.taskPoint} />
                        </ListCell>
                        <ListCell width={110}>
                          <TaskDate
                            taskId={task.id}
                            date={task.dueDate ? new Date(task.dueDate) : null}
                          />
                        </ListCell>
                        <ListCell width={100}>
                          <MemberAvatar uid={task.createdBy} />
                        </ListCell>
                      </div>
                    </div>
                  )
                })}
              <ListCreateTask type="status" groupId={stt.id} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
