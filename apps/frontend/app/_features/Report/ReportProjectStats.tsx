import ReportByProjectItem from './ReportByProjectItem'
import { useReportContext } from './context'


export default function ReportProjectStats() {
  const { selectedProjectIds, duration } = useReportContext()
  console.log('render herre')

  return <div className='space-y-3'>
    {selectedProjectIds.map(p => {
      return <ReportByProjectItem key={p} projectId={p} duration={duration} />
    })}
  </div>

}
