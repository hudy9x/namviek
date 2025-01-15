import { DropdownMenu, Modal } from '@shared/ui'
import { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { GoTypography } from 'react-icons/go'
import ProjectViewChangeName from './ProjectViewChangeName'
import ProjectViewDelete from './ProjectViewDelete'
import { ProjectViewType } from '@prisma/client'
import ProjectViewSetAsDefault from './ProjectViewSetAsDefault'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

export default function ProjectViewItemDropdown({
  id,
  name,
  type,
  onUpdate
}: {
  id: string
  name: string
  type: ProjectViewType
  onUpdate: (id: string) => void
}) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <HiOutlineDotsVertical className="project-tab-action group-hover:opacity-100" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onClick={() => setTimeout(() => setVisible(true), 200)}
            icon={<GoTypography />}
            title="Rename"
          />
          <DropdownMenu.Item
            onClick={() => {
              onUpdate(id)
            }}
            icon={<HiOutlinePencilSquare />}
            title='Update'
          />
          <ProjectViewSetAsDefault id={id} />
          <ProjectViewDelete id={id} />
        </DropdownMenu.Content>
      </DropdownMenu>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Rename tab"
        content={
          <ProjectViewChangeName
            id={id}
            name={name}
            type={type}
            hideModal={() => {
              setVisible(false)
            }}
          />
        }
      />
    </>
  )
}
