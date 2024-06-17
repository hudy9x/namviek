import { useOrgMemberStore } from "@/store/orgMember"
import { useReportContext } from "./context"

export default function ReportFilterMember() {
  const { orgMembers } = useOrgMemberStore()
  const { toggleMemberIds, selectedMemberIds } = useReportContext()
  return <div className='report-member-filter'>
    {orgMembers.map(mem => {
      const isActive = selectedMemberIds.includes(mem.id) ? 'active' : ''
      return <div key={mem.id}
        onClick={() => {
          toggleMemberIds(mem.id)
        }}
        className={`report-filter-member-item ${isActive}`}>
        <img src={mem.photo || ''} className="w-6 h-6 rounded-full" alt={mem.name || ''} />
        <span>{mem.name}</span>
      </div>
    })}
  </div>
}
