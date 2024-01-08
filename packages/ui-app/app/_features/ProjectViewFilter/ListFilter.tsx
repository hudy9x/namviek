import { ProjectViewType } from "@prisma/client";
import { Button } from "@shared/ui";
import FilterForm from "./FilterForm";

export default function ProjectViewFilterByList({ type, desc, onAdd }: {
  type: ProjectViewType
  desc: string
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
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={'Add list'}
        />
      </div>
    </div></>
}
