import ProjectIconPicker from '@/components/ProjectIconPicker'
import FavoriteAdd from '@/features/Favorites/FavoriteAdd'
import { useProjectStore } from '@/store/project'
import { Project } from '@prisma/client'
import { dateFormat } from '@shared/libs'
import { formatDistanceToNow } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import { AiOutlineClockCircle } from 'react-icons/ai'
import ProjectItemAction from './ProjectItemActions'

export default function ProjectItem({
  project,
  isArchived = false
}: {
  project: Project
  isArchived?: boolean
}) {
  const { orgID } = useParams()
  const { push } = useRouter()
  const { selectProject } = useProjectStore(state => state)
  const createdAt = project.createdAt
  const createdAtString = createdAt ? dateFormat(new Date(createdAt), 'PP') : ''
  const url = `${orgID}/project/${project.id}?mode=task`

  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  return (
    <div
      key={project.id}
      onClick={() => {
        onSelectProject(project.id)
        push(url)
      }}>
      <div className="project-item group relative">
        <ProjectIconPicker icon={project.icon || ''} projectId={project.id} />
        <div className="overflow-hidden">
          <h2 className="text-lg text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 truncate">
            {project.name}
          </h2>

          <ProjectItemAction
            isArchived={isArchived}
            project={project}
            className="absolute top-5 right-3 opacity-0 group-hover:opacity-100"
          />

          <p className="text-xs text-gray-400 dark:text-gray-500">
            <span title={createdAtString} className="flex items-center gap-1">
              <AiOutlineClockCircle className="text-gray-500" />
              {createdAt ? formatDistanceToNow(new Date(createdAt)) : null}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
