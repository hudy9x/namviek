import { useOrgMemberStore } from "@/store/orgMember"
import { useReportContext } from "./context"
import { Avatar } from "@shared/ui"

export default function ReportFilterMember() {
  const { orgMembers } = useOrgMemberStore()
  const { toggleMemberIds, selectedMemberIds } = useReportContext()
  const allSelectedMembers = orgMembers.filter(p => !selectedMemberIds.includes(p.id))

  return <div>
    <small className="uppercase text-[10px]">Member filter</small>
    <div className='report-member-filter'>
      {!allSelectedMembers.length ? <div className="text-xs px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">All members has selected !</div> : null}
      {allSelectedMembers.map(mem => {
        return <div key={mem.id}
          onClick={() => {
            toggleMemberIds(mem.id)
          }}
          className={`report-filter-member-item`}>
          <Avatar src={mem.photo || ''} name={mem.name || ''} size="md" />
          <span className="text-xs">{mem.name}</span>
        </div>
      })}
    </div>
  </div>
}
