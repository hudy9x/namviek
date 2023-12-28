import { Modal } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectViewForm from './ProjectViewForm'

export default function ProjectViewCreate() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div className="w-[1px] h-[20px] bg-gray-300 mx-2 my-2"></div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title=""
        triggerBy={
          <div className="project-tab-item">
            <AiOutlinePlus />
            <span>View</span>
          </div>
        }
        content={<ProjectViewForm />}
      />
    </>
  )
}
