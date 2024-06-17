import ReportByMemberItem from "./ReportByMemberItem";
import { useReportContext } from "./context";

export default function ReportMemberStats() {
  const { selectedMemberIds, selectedProjectIds } = useReportContext()

  return <div className='report-member-stats'>
    {selectedMemberIds.map(memberId => {
      return <ReportByMemberItem key={memberId} memberId={memberId} projectIds={selectedProjectIds} />
    })}
  </div>
}
