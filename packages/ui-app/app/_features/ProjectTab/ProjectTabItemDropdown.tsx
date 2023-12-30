import { Button, DropdownMenu, Form, Modal } from "@shared/ui";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlineDocumentText, HiOutlineTrash } from "react-icons/hi2";
import ProjectViewChangeName from "./ProjectViewChangeName";
import ProjectViewDelete from "./ProjectViewDelete";

export default function ProjectTabItemDropdown({ id, name }: { id: string, name: string }) {
  const [visible, setVisible] = useState(false)


  return <>
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <HiOutlineDotsVertical className="project-tab-action group-hover:opacity-100" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          onClick={() => setVisible(true)}
          icon={<HiOutlineDocumentText />}
          title='Rename'
        />
        <ProjectViewDelete id={id} />
      </DropdownMenu.Content>
    </DropdownMenu >
    <Modal visible={visible} onVisibleChange={setVisible} title="Rename tab" content={
      <ProjectViewChangeName id={id} name={name} hideModal={() => {
        setVisible(false)
      }} />
    } />
  </>

}
