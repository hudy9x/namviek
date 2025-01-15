import { ProjectViewType } from "@prisma/client";
import { Button } from "@shared/ui";
import ProjectViewForMe from "../ProjectView/ProjectViewForMe";

export default function ProjectViewFilterByDashboard({ type, desc, isUpdate, onAdd }: {
  type: ProjectViewType
  desc: string
  isUpdate: boolean
  onAdd: () => void
}) {
  if (type !== ProjectViewType.DASHBOARD) return null
  return <><img
    className="mb-8"
    src="https://app-cdn.clickup.com/workload.8bdd1d1f836c77c96f8bc0c480e22b80.svg"
  />
    <div className="">
      <h2 className="text-xl mb-3">Dashboard</h2>
      <p className="text-sm text-gray-500 mb-6">{desc}</p>
      <ProjectViewForMe />
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={isUpdate ? 'Update dashboard' : 'Add dashboard'}
        />
      </div>
    </div></>
}
