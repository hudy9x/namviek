'use client'

import { useProjectStore } from '@/store/project'
import { projectGet } from '@/services/project'
import { useEffect, useState } from 'react'
import './style.css'

import { AiOutlinePlus } from 'react-icons/ai'
import ProjectAddModal from '../Add/ProjectAddModal'
import ProjectItem from './ProjectItem'

import ProjectArchived from './ProjectArchived'

export default function ProjectList() {
  const { projects, addAllProject } = useProjectStore(
    state => state
  )

  useEffect(() => {
    if (!projects.length) {
      projectGet({
        isArchive: false
      }).then(result => {
        const { data, status } = result.data
        // const projects = data as Project[]
        if (status !== 200) return

        addAllProject(data)
      })
    }
  }, [JSON.stringify(projects)])


  return (
    <div className="bg-indigo-50/50 dark:bg-[#182031]">
      <div className="bg-white py-3 border-b dark:bg-gray-900 dark:border-gray-700">
        <div className="px-5 sm:w-[1120px] mx-auto">
          <h2 className="text-gray-600 dark:text-gray-300 font-bold text-xl">
            Your projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Display the entire list of projects that you are currently a member
            of.
          </p>
        </div>
      </div>
      <div style={{ height: `calc(100vh - 73px)` }}>
        <div className="px-5 sm:w-[1120px] mx-auto pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-8">
            <ProjectAddModal
              triggerComponent={
                <div className="project-item bg-indigo-50 border-dashed">
                  <div className="border dark:border-gray-700 rounded-md p-2">
                    <AiOutlinePlus className="text-gray-500 text-sm" />
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-600 dark:text-gray-400">
                      Create new
                    </h2>
                  </div>
                </div>
              }
            />
          </div>
          <h2 className="text-lg mb-3 text-gray-500">Select one to go</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {projects.map(project => {
              return (
                <ProjectItem key={project.id} project={project} />
              )
            })}
          </div>
          <ProjectArchived />
        </div>
      </div>
    </div>
  )
}
