import ReportByProjectItem from './ReportByProjectItem'
import { useReportContext } from './context'


export default function ReportProjectStats() {
  const { selectedProjectIds } = useReportContext()

  return <div>
    {selectedProjectIds.map(p => {
      return <ReportByProjectItem key={p} projectId={p} />
    })}
  </div>

}
