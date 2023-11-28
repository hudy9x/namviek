'use client'

import { useProjectStore } from '@/store/project'
import { projectGet } from '@/services/project'
import { useEffect } from 'react'
import './style.css'
import { useParams } from 'next/navigation'
import { AiOutlineClockCircle, AiOutlinePlus } from 'react-icons/ai'
import ProjectAddModal from '../Add/ProjectAddModal'
import { useRouter } from 'next/navigation'
import ProjectIconPicker from '@/components/ProjectIconPicker'
import { format, formatDistanceToNow } from 'date-fns'
import FavoriteAdd from '@/features/Favorites/FavoriteAdd'

export default function ProjectList() {
  const { projects, addAllProject, selectProject } = useProjectStore(
    state => state
  )
  const { orgID } = useParams()
  const { push } = useRouter()

  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  useEffect(() => {
    if (!projects.length) {
      projectGet().then(result => {
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
              const createdAt = project.createdAt
              const createdAtString = createdAt
                ? format(new Date(createdAt), 'PP')
                : ''
              const url = `${orgID}/project/${project.id}?mode=task`
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project.id)
                    push(url)
                  }}>
                  <div className="project-item group relative">
                    <ProjectIconPicker
                      icon={project.icon || ''}
                      projectId={project.id}
                    />
                    <div>
                      <h2 className="text-lg text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                        {project.name}
                      </h2>
                      <FavoriteAdd
                        className="absolute top-5 right-3 opacity-0 group-hover:opacity-100"
                        name={project.name}
                        icon={project.icon || ''}
                        link={url}
                        type="PROJECT"
                      />
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        <span
                          title={createdAtString}
                          className="flex items-center gap-1">
                          <AiOutlineClockCircle className="text-gray-500" />
                          {createdAt
                            ? formatDistanceToNow(new Date(createdAt))
                            : null}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
