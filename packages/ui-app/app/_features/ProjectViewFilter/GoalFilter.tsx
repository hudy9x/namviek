import { ProjectViewType } from "@prisma/client";
import { Button } from "@shared/ui";
import ProjectViewForMe from "../ProjectView/ProjectViewForMe";

export default function ProjectViewFilterByGoal({ type, desc, onAdd, isUpdate }: {
  type: ProjectViewType
  desc: string
  isUpdate: boolean
  onAdd: () => void
}) {
  if (type !== ProjectViewType.GOAL) return null
  return <><img
    className="mb-8"
    src="https://app-cdn.clickup.com/gantt.b90233aaab6b219a391e08b8b5186915.svg"
  />
    <div className="">
      <h2 className="text-xl mb-3">Goal</h2>
      <p className="text-sm text-gray-500 mb-6">{desc}</p>
      <ProjectViewForMe />
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={isUpdate ? 'Update goal' : 'Add goal'}
        />
      </div>
    </div></>
}
