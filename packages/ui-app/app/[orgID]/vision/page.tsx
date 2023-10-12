'use client'

import MemberAvatar from '@/components/MemberAvatar'
import ProgressBar from '@/components/ProgressBar'
import { useVisionStore } from '@/store/vision'
import ListCell from '../project/[projectId]/views/ListCell'
import TaskDate from '../project/[projectId]/views/TaskDate'
import TaskProject from '../project/[projectId]/views/TaskProject'
import VisionCreate from './VisionCreate'
import { taskList } from './dummy'

export default function Page() {
  const { visions } = useVisionStore()
  return (
    <>
      <div className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h2 className="px-4 py-2 text-xl font-bold">Vision</h2>
      </div>
      <div
        className="task bg-indigo-50/50 dark:bg-[#182031] w-full"
        style={{ height: `calc(100vh - 53px)` }}>
        <div className="relative">
          <div className="pb-[300px] pt-4">
            {visions.map(vs => {
              return (
                <div
                  className="relative mx-4 mt-4 mb-4 bg-white border rounded-md dark:bg-gray-900 dark:border-gray-800"
                  key={vs.id}>
                  <div className="px-3 py-2 border-b dark:border-b-gray-800 sticky top-[45px] bg-white dark:bg-gray-900 rounded-t-md flex items-center justify-end z-10">
                    <div></div>
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500 uppercase">
                      <ListCell width={110}>Project</ListCell>
                      <ListCell width={110}>Duedate</ListCell>
                      <ListCell width={110}>Progress</ListCell>
                      <ListCell width={100}>Created by</ListCell>
                    </div>
                  </div>

                  <div className="divide-y dark:divide-gray-800">
                    {/* -------------Task render---------------- */}
                    {taskList.map(task => {
                      return (
                        <div
                          className="flex items-center justify-between px-3 py-2 text-sm group"
                          key={task.id}>
                          <div className="flex items-center gap-2 dark:text-gray-300">
                            test 1
                          </div>
                          <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
                            <ListCell width={110}>
                              <TaskProject
                                taskId={task.id}
                                projectId={task.projectId}
                              />
                            </ListCell>

                            <ListCell width={110}>
                              <TaskDate
                                taskId={task.id}
                                date={
                                  task.dueDate ? new Date(task.dueDate) : null
                                }
                              />
                            </ListCell>

                            <ListCell width={110}>
                              <ProgressBar
                                color="green"
                                progress={task.progress || 0}
                              />
                            </ListCell>

                            <ListCell width={100}>
                              <MemberAvatar uid={task.createdBy} />
                            </ListCell>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="absolute bottom-10 right-10 z-[11] ">
            <VisionCreate />
          </div>
        </div>
      </div>
    </>
  )
}
   