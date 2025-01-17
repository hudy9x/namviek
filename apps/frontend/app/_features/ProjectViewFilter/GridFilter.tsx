// apps/frontend/app/_features/ProjectViewFilter/GridFilter.tsx
import { ProjectViewType } from '@prisma/client'
import { useProjectViewContext } from '../ProjectView/context'
import ProjectViewForMe from '../ProjectView/ProjectViewForMe'
import { Button } from '@ui-components'

export default function ProjectViewFilterByGrid({
  type,
  desc,
  isUpdate,
  onAdd
}: {
  type: ProjectViewType
  desc: string
  isUpdate: boolean
  onAdd: () => void
}) {

  if (type !== ProjectViewType.GRID) {
    return null
  }

  return <>
    <img
      className="mb-8"
      src="https://app-cdn.clickup.com/gantt.b90233aaab6b219a391e08b8b5186915.svg"
    />
    <div className="">
      <h2 className="text-xl mb-3">Grid</h2>
      <p className="text-sm text-gray-500 mb-6">{desc}</p>
      <ProjectViewForMe />
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={isUpdate ? 'Update grid' : 'Add grid'}
        />
      </div>
    </div>
  </>

}
