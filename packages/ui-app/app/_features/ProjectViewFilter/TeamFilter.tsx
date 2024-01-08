import { ProjectViewType } from "@prisma/client";
import { Button } from "@shared/ui";

export default function ProjectViewFilterByTeam({ type, desc, onAdd }: {
  type: ProjectViewType
  desc: string
  onAdd: () => void
}) {
  if (type !== ProjectViewType.TEAM) return null
  return <><img
    className="mb-8"
    src="https://app-cdn.clickup.com/box.313feb9cad5a46534c65878666cb4e32.svg"
  />
    <div className="">
      <h2 className="text-xl mb-3">Team</h2>
      <p className="text-sm text-gray-500 mb-6">{desc}</p>
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={'Add team'}
        />
      </div>
    </div></>
}
