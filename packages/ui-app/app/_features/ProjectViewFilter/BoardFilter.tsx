import { ProjectViewType } from '@prisma/client'
import { Button } from '@shared/ui'
import FilterForm from './FilterForm'
import ProjectViewForMe from '../ProjectView/ProjectViewForMe'

export default function ProjectViewFilterByBoard({
  type,
  desc,
  isUpdate,
  onAdd
}: {
  type: ProjectViewType
  isUpdate: boolean
  desc: string
  onAdd: () => void
}) {
  if (type !== ProjectViewType.BOARD) return null

  return (
    <>
      <img
        alt="View image"
        className="mb-8"
        src="https://app-cdn.clickup.com/board.907d1432b657468448e1ed65506b1184.svg"
      />
      <div className="">
        <h2 className="text-xl mb-3">Board</h2>
        <p className="text-sm text-gray-500 mb-6">{desc}</p>

        <FilterForm type="BOARD" />
        <ProjectViewForMe />

        <div className="text-right">
          <Button onClick={onAdd} primary title={isUpdate ? 'Update board' : 'Add board'} />
        </div>
      </div>
    </>
  )
}
