import { Button, DropdownMenu, Form, Modal } from '@shared/ui'
import { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { HiOutlineDocumentText, HiOutlineTrash } from 'react-icons/hi2'
import { GoTypography } from 'react-icons/go'
import ProjectViewChangeName from './ProjectViewChangeName'
import ProjectViewDelete from './ProjectViewDelete'
import { ProjectViewType } from '@prisma/client'
import ProjectViewSetAsDefault from './ProjectViewSetAsDefault'
import ProjectViewUpdate from './ProjectViewUpdate'

export default function ProjectViewItemDropdown({
  id,
  name,
  type
}: {
  id: string
  name: string
  type: ProjectViewType
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
          <ProjectViewUpdate id={id} />
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
