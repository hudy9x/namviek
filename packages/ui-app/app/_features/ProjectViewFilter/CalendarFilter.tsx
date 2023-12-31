import { ProjectViewType } from "@prisma/client";
import { Button } from "@shared/ui";
import FilterForm from "./FilterForm";

export default function ProjectViewFilterByCalendar({ type, desc, onAdd }: {
  type: ProjectViewType
  desc: string
  onAdd: () => void
}) {
  if (type !== ProjectViewType.CALENDAR) return null
  return <><img
    className="mb-8"
    src="https://app-cdn.clickup.com/calendar.025fe36a51c85d765c298f091481e9e5.svg"
  />
    <div className="">
      <h2 className="text-xl mb-3">Calendar</h2>
      <p className="text-sm text-gray-500 mb-6">{desc}</p>
      <FilterForm />
      <div className="text-right">
        <Button
          onClick={onAdd}
          primary
          title={'Add calendar'}
        />
      </div>
    </div></>
}
