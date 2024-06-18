import ReportByMemberItem from "./ReportByMemberItem";
import { useReportContext } from "./context";

export default function ReportMemberStats() {
  const { selectedMemberIds, selectedProjectIds } = useReportContext()

  return <div className='report-member-stats grid grid-cols-2 gap-3 mt-3'>
    {selectedMemberIds.map(memberId => {
      return <ReportByMemberItem key={memberId} memberId={memberId} projectIds={selectedProjectIds} />
    })}
  </div>
}
