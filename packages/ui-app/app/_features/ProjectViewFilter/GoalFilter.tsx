import { ProjectViewType } from "@prisma/client";
import { Button } from "@shared/ui";

export default function ProjectViewFilterByGoal({ type, desc, onAdd }: {
  type: ProjectViewType
  desc: string
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
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={'Add goal'}
        />
      </div>
    </div></>
}
