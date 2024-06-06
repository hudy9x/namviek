'use client'
import ProjectTabContent from './ProjectTabContent'
import TaskCreate from './TaskCreate'
import ProjectView from '@/features/ProjectView'
import { TaskUpdate2 } from './TaskUpdate2'
import ProjectAdvanceTabs from '@/features/ProjectAdvanceTabs'
import ProjectHeader from '@/features/Project/Header'

export default function ProjectNav() {

  return (
    <div className="project-nav">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <ProjectHeader />
        <div className="hidden sm:flex items-center justify-between">
          <ProjectView />
          <ProjectAdvanceTabs />
        </div>
      </div>

      <div className="task bg-indigo-50/50 dark:bg-[#182031] w-full">
        <ProjectTabContent />
      </div>
      <div className="absolute bottom-10 right-10 z-[11]">
        <div className="hidden sm:flex items-center gap-2 ">
          {/* <PromptGenerator /> */}
          {/* <FavoriteAddModal /> */}
          <TaskCreate />
        </div>
      </div>
      {/* <TaskUpdate /> */}
      <TaskUpdate2 />
    </div>
  )
}
