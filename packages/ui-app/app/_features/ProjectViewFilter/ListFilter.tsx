import { ProjectViewType } from "@prisma/client";
import { Button } from "@shared/ui";
import FilterForm from "./FilterForm";
import ProjectViewForMe from "../ProjectView/ProjectViewForMe";

export default function ProjectViewFilterByList({ type, desc, isUpdate, onAdd }: {
  type: ProjectViewType
  desc: string
  isUpdate: boolean
  onAdd: () => void
}) {
  if (type !== ProjectViewType.LIST) return null
  return <><img
    className="mb-8"
    src="https://app-cdn.clickup.com/list.f86dfb81f1654e162b5d634824f7c6cc.svg"
  />
    <div className="">
      <h2 className="text-xl mb-3">List</h2>
      <p className="text-sm text-gray-500 mb-6">{desc}</p>

      <FilterForm />
      <ProjectViewForMe />
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={isUpdate ? 'Update list' : 'Add list'}
        />
      </div>
    </div></>
}
