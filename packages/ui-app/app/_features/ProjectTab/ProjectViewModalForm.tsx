import { ProjectViewType } from '@prisma/client'
import { Button } from '@shared/ui'
import { useProjectViewContext } from './context'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useProjectViewAdd } from './useProjectViewAdd'

export default function ProjectViewModalForm({
  type,
  name,
  desc
}: {
  type: ProjectViewType
  name: string
  desc: string
}) {
  const { projectId } = useParams()
  const { setVisible, name: viewName } = useProjectViewContext()
  const [loading, setLoading] = useState(false)
  const { addProjectView } = useProjectViewAdd()

  const hideModal = () => {
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
    }, 500)
  }

  const onAdd = () => {
    setLoading(true)
    addProjectView({ name: viewName || name, type, projectId })
      .catch(err => {
        hideModal()
      })
      .finally(() => {
        hideModal()
      })
  }

  return (
    <div className="min-h-[500px]">
      <img
        className="mb-8"
        src="https://app-cdn.clickup.com/list.f86dfb81f1654e162b5d634824f7c6cc.svg"
      />
      <div className="">
        <h2 className="text-xl mb-3">{name}</h2>
        <p className="text-sm text-gray-500 mb-6">{desc}</p>
        <div className="text-right">
          <Button
            loading={loading}
            onClick={onAdd}
            primary
            title={'Add ' + name}
          />
        </div>
      </div>
    </div>
  )
}
