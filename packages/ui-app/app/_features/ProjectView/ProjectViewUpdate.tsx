import { Dialog, messageError, setFixLoading } from '@shared/ui'
import { useEffect, useState } from 'react'
import ProjectViewModal from './ProjectViewModal'
import { IBoardFilter, ProjectViewModalProvider } from './context'
import { ETaskFilterGroupByType } from '../TaskFilter/context'
import { projectView } from '@/services/projectView'
import { ProjectView } from '@prisma/client'
import { useProjectViewUpdateContext } from './updateContext'
import { useProjectViewStore } from '@/store/projectView'

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
  const [onlyMe, setOnlyMe] = useState(false)
  const { views } = useProjectViewStore()
  const { setUpdateId, updateId } = useProjectViewUpdateContext()
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

  const viewDeps = JSON.stringify(views)
  useEffect(() => {
    if (!id) return
    console.log('project view id ', id)
    console.log('views', views)
    const view = views.find(v => v.id === id)
    if (!view) {
      messageError('This view does not exist. Please reload the page')
      return
    }


    // projectView.getOne(id).then(res => {

    // const { data } = res.data
    // const pvData = data as ProjectView
    // const isCustom = !!Object.keys(data.data).length

    const pvData = view
    const isCustom = !!Object.keys(view.data as unknown as object).length

    console.log('pv Data', pvData)

    setName(pvData.name || '')
    setIcon(pvData.icon || '')
    setOnlyMe(!!pvData.onlyMe)
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

    // })
  }, [id, viewDeps])

  return (
    <ProjectViewModalProvider
      value={{
        icon,
        name,
        isUpdate: !!updateId,
        onlyMe,
        setOnlyMe,
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

    </ProjectViewModalProvider>
  )
}
