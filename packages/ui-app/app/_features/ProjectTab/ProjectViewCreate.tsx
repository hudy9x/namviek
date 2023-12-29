import { Modal } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectViewModal from './ProjectViewModal'
import { ProjectViewProvider } from './context'

export default function ProjectViewCreate() {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  return (
    <ProjectViewProvider
      value={{
        name,
        setName,
        visible,
        setVisible
      }}>

      <Modal
        backdrop={false}
        className="project-view-modal"
        size="lg"
        visible={visible}
        onVisibleChange={setVisible}
        title=""
        triggerBy={
          <div className="project-tab-item">
            <AiOutlinePlus />
            <span>View</span>
          </div>
        }
        content={<ProjectViewModal />}
      />
    </ProjectViewProvider>
  )
}
