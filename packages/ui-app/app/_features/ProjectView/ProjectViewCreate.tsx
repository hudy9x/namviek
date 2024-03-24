import { Modal } from '@shared/ui'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectViewModal from './ProjectViewModal'
import { IBoardFilter, ProjectViewProvider } from './context'
import { ETaskFilterGroupByType } from '../TaskFilter/context'

export default function ProjectViewCreate() {
  const [visible, setVisible] = useState(false)
  const [icon, setIcon] = useState('')
  const [name, setName] = useState('')
  const [customView, setCustomView] = useState(false)
  const [filter, setFilter] = useState<IBoardFilter>({
    date: 'this-month',
    priority: 'ALL',
    point: "-1",
    statusIds: ['ALL'],
    groupBy: ETaskFilterGroupByType.STATUS
  })

  useEffect(() => {
    if (visible === false) {
      setCustomView(false)
    }

  }, [visible])

  return (
    <ProjectViewProvider
      value={{
        icon,
        name,
        setIcon,
        setName,
        visible,
        setVisible,
        customView,
        setCustomView,
        filter,
        setFilter
      }}>

      <Modal
        backdrop={false}
        className="project-view-modal"
        size="lg"
        visible={visible}
        onVisibleChange={setVisible}
        title=""
        triggerBy={
          <div className="project-view-item">
            <AiOutlinePlus />
            <span>View</span>
          </div>
        }
        content={<ProjectViewModal />}
      />
    </ProjectViewProvider>
  )
}
