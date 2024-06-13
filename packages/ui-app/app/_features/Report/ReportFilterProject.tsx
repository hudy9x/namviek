import { useReportContext } from "./context"

export default function ReportFilterProject() {
  const { counter } = useReportContext()
  console.log('render filter project')
  return <div className='report-filter-project'>
    Project counter: {counter}
  </div>
}
