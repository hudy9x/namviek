'use client'

import { useProjectStore } from '@/store/project'
import { projectGet } from '@/services/project'
import { useEffect } from 'react'
import { Project } from '@prisma/client'
import './style.css'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ProjectList() {
  const { projects, addAllProject, selectProject } = useProjectStore(
    state => state
  )
  const { orgID } = useParams()

  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  useEffect(() => {
    console.log('get all projects')
    projectGet().then(result => {
      const { data, status } = result.data
      const projects = data as Project[]

      console.log('return data', projects)

      if (status !== 200) return

      addAllProject(data)
      // projects.some(p => {
      //   if (p.id === params.projectId) {
      //     onSelectProject(p.id)
      //     return true
      //   }
      // })
    })
  }, [])
  return (
    <div className="bg-indigo-50/50">
      <div className="bg-white py-3 border-b">
        <div className="w-[1120px] mx-auto">
          <h2 className="text-gray-600 font-bold text-xl">Your projects</h2>
          <p className="text-gray-500 text-sm">
            Display the entire list of projects that you are currently a member
            of.
          </p>
        </div>
      </div>
      <div style={{ height: `calc(100vh - 73px)` }}>
        <div className="w-[1120px] mx-auto pt-8">
          <div className="grid grid-cols-3 gap-3">
            {projects.map(project => {
              return (
                <Link
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project.id)
                  }}
                  href={`${orgID}/project/${project.id}?mode=task`}>
                  <div className="project-item">
                    <div className="border rounded-md p-2">🎨</div>
                    <div>
                      <h2 className="text-xl font-medium">{project.name}</h2>
                      <p className="text-gray-400 text-xs leading-5">
                        Lorem ipsum dolor sit amet, qui minim labore adipisicing
                        minim sint cillum sint consectetur cupidatat.
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
