import useServiceFavoriteUpdate, {
  IFavoriteProps
} from '@/hooks/useServiceFavoriteUpdate'
import useServiceProjectArchive from '@/hooks/useServiceProjectArchive'
import { projectService } from '@/services/project'
import { Project } from '@prisma/client'
import { DropdownMenu } from '@shared/ui'
import { useParams } from 'next/navigation'
import { HiOutlineArchive, HiOutlineDotsVertical } from 'react-icons/hi'
import { HiOutlineStar } from 'react-icons/hi2'

export default function ProjectItemAction({
  className,
  project,
  isArchived = false
}: {
  className?: string
  project: Project
  isArchived?: boolean
}) {
  const { orgID } = useParams()
  const { addToFavorite } = useServiceFavoriteUpdate()
  const { moveToArchive, removeFromArchive } = useServiceProjectArchive()

  const url = `${orgID}/project/${project.id}?mode=task`

  const moveToArchiveHandler = () => {
    if (isArchived) {
      removeFromArchive(project)
    } else {
      moveToArchive(project)
    }

    // const value = isArchived ? false : true
    // projectService.archive(project.id, value).then(res => {
    //   console.log(res)
    // })
  }

  const addToFavoriteHandler = () => {
    addToFavorite({
      name: project.name,
      icon: project.icon || '',
      link: url,
      type: 'PROJECT'
    })
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenu.Trigger
          title=""
          size="sm"
          icon={<HiOutlineDotsVertical />}
        />
        <DropdownMenu.Content>
          {isArchived ? null : (
            <DropdownMenu.Item
              onClick={addToFavoriteHandler}
              icon={<HiOutlineStar />}
              title={'Add to favorite'}
            />
          )}
          <DropdownMenu.Item
            onClick={moveToArchiveHandler}
            icon={<HiOutlineArchive />}
            title={isArchived ? 'Remove from archive' : 'Move to archive'}
          />
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  )
}
