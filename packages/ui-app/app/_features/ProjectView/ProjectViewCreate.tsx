import { Dialog } from '@shared/ui'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectViewModal from './ProjectViewModal'
import { IBoardFilter, ProjectViewModalProvider } from './context'
import { ETaskFilterGroupByType } from '../TaskFilter/context'

export default function ProjectViewCreate() {
  const [visible, setVisible] = useState(false)
  const [icon, setIcon] = useState('')
  const [name, setName] = useState('')
  const [customView, setCustomView] = useState(false)
  const [onlyMe, setOnlyMe] = useState(false)
  const [filter, setFilter] = useState<IBoardFilter>({
    date: 'this-month',
    priority: 'ALL',
    point: "-1",
    statusIds: ['ALL'],
    assigneeIds: ['ME'],
    groupBy: ETaskFilterGroupByType.STATUS
  })

  useEffect(() => {
    if (visible === false) {
      setCustomView(false)
    }

  }, [visible])

  return (
    <ProjectViewModalProvider
      value={{
        icon,
        isUpdate: false,
        onlyMe,
        setOnlyMe,
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

      <Dialog.Root open={visible} onOpenChange={setVisible}>
        <Dialog.Trigger>
          <div className="project-view-item">
            <AiOutlinePlus />
            <span>View</span>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content size='lg'>
            <ProjectViewModal />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </ProjectViewModalProvider>
  )
}
