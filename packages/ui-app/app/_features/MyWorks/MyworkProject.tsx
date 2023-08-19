'use client'

import { useProjectStore } from '@/store/project'
import { useMyworkContext } from './context'
import { AiOutlineCheck } from 'react-icons/ai'

export default function MyWorkProject() {
  const { projects } = useProjectStore()
  const { projectId, selectProject } = useMyworkContext()

  return (
    <div className="py-4">
      <h2 className="font-medium flex items-center justify-between gap-2 pb-2">
        <span>🚴‍♀️ Projects</span>
      </h2>
      <div className="bg-white rounded-md border divide-y divide-dashed">
        <div className="mw-project-item" onClick={() => selectProject('all')}>
          All
          {projectId === 'all' && (
            <AiOutlineCheck className="w-5 h-5 p-1 text-white rounded-full bg-indigo-500" />
          )}
        </div>
        {projects.map(project => {
          const { id, name } = project
          const isSelected = projectId === id

          return (
            <div
              key={id}
              onClick={() => selectProject(id)}
              className="mw-project-item">
              {name}
              {isSelected && (
                <AiOutlineCheck className="w-5 h-5 p-1 text-white rounded-full bg-indigo-500" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
