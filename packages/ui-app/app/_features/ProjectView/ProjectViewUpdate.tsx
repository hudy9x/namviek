import { Dialog, Modal } from '@shared/ui'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectViewModal from './ProjectViewModal'
import { IBoardFilter, ProjectViewCreateProvider } from './context'
import { ETaskFilterGroupByType } from '../TaskFilter/context'
import { projectView } from '@/services/projectView'
import { ProjectView } from '@prisma/client'
import { useProjectViewUpdateContext } from './updateContext'


export default function ProjectViewUpdate({
  id,
}:
  {
    id: string
  }) {
  const [visible, setVisible] = useState(false)
  const [icon, setIcon] = useState('')
  const [name, setName] = useState('')
  const [customView, setCustomView] = useState(false)
  const { setUpdateId } = useProjectViewUpdateContext()
  const [filter, setFilter] = useState<IBoardFilter>({
    date: 'this-month',
    priority: 'ALL',
    point: "-1",
    statusIds: ['ALL'],
    groupBy: ETaskFilterGroupByType.STATUS
  })

  useEffect(() => {
    setVisible(!!id)
  }, [id])

  useEffect(() => {
    if (!visible) {
      setUpdateId('')
    }
  }, [visible])

  useEffect(() => {
    console.log('project view id ', id)
    id && projectView.getOne(id).then(res => {
      const { data } = res.data
      const pvData = data as ProjectView
      const isCustom = !!Object.keys(data.data).length

      setName(pvData.name || '')
      setIcon(pvData.icon || '')
      setCustomView(isCustom)

      if (isCustom) {
        const customData = pvData.data
        console.log('custom data', customData)
        setFilter(customData as unknown as IBoardFilter)
      } else {
        setFilter({
          date: 'this-month',
          priority: 'ALL',
          point: "-1",
          statusIds: ['ALL'],
          groupBy: ETaskFilterGroupByType.STATUS
        })
      }

    })
  }, [id])

  return (
    <ProjectViewCreateProvider
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

      <Dialog.Root open={visible} onOpenChange={setVisible}>
        <Dialog.Portal>
          <Dialog.Content size='lg'>
            <ProjectViewModal />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </ProjectViewCreateProvider>
  )
}
