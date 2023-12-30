import { ProjectViewType } from "@prisma/client";
import { Button } from "@shared/ui";

export default function ProjectViewFilterByDashboard({ type, desc, onAdd }: {
  type: ProjectViewType
  desc: string
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
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={'Add dashboard'}
        />
      </div>
    </div></>
}
