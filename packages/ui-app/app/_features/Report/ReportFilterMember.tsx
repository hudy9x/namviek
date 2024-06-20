import { useOrgMemberStore } from "@/store/orgMember"
import { useReportContext } from "./context"
import { Avatar } from "@shared/ui"

export default function ReportFilterMember() {
  const { orgMembers } = useOrgMemberStore()
  const { toggleMemberIds, selectedMemberIds } = useReportContext()
  return <div>
    <small className="uppercase text-[10px]">Member filter</small>
    <div className='report-member-filter'>
      {orgMembers.map(mem => {
        const isActive = selectedMemberIds.includes(mem.id) ? 'active' : ''
        return <div key={mem.id}
          onClick={() => {
            toggleMemberIds(mem.id)
          }}
          className={`report-filter-member-item ${isActive}`}>
          <Avatar src={mem.photo || ''} name={mem.name || ''} size="md" />
          <span className="text-xs">{mem.name}</span>
        </div>
      })}
    </div>
  </div>
}
