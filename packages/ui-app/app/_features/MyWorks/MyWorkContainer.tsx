'use client'
import { useEffect, useState } from 'react'
import MyOvedueTasks from './MyOvedueTasks'
import MyTodayTasks from './MyTodayTasks'
import MyUpcomingTasks from './MyUpcommingTasks'
import MyUrgentTasks from './MyUrgentTasks'
import MyWorkMembers from './MyWorkMembers'
import { MyWorkProvider } from './context'
import { useUser } from '@goalie/nextjs'
import MyWorkProject from './MyworkProject'

export default function MyworkContainer() {
  const [assigneeIds, setAssigneeIds] = useState<string[]>([])
  const [projectId, setProjectId] = useState('all')

  const { user } = useUser()

  useEffect(() => {
    if (user?.id) {
      setAssigneeIds(pu => [user.id, ...pu])
    }
  }, [user?.id])
  return (
    <MyWorkProvider
      value={{
        assigneeIds,
        projectId,
        setAssigneeIds,
        setProjectId
      }}>
      <div id="my-work">
        <div className="py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
          <div className="w-[1120px] mx-auto">
            <h2 className="text-gray-600 dark:text-gray-300 font-bold text-xl">
              My works board
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Where to control your overdue, inprogress and upcoming tasks in
              all projects with ease
            </p>
          </div>
        </div>

        <div
          className="bg-indigo-50/50 dark:bg-[#182031]"
          style={{ height: 'calc(100vh - 73px)' }}>
          <div className="w-[1120px] mx-auto pt-10 grid grid-cols-4 gap-6">
            <div className="grid grid-cols-2 col-span-3 gap-6">
              <div>
                <MyUrgentTasks />
                <MyOvedueTasks />
              </div>

              <div>
                <MyTodayTasks />
                <MyUpcomingTasks />
              </div>
            </div>
            <div>
              <MyWorkProject />
              <MyWorkMembers />
            </div>
          </div>
        </div>
      </div>
    </MyWorkProvider>
  )
}
