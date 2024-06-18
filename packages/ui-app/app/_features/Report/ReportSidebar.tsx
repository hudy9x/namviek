import ReportFilterMember from "./ReportFilterMember"
import ReportFilterProject from "./ReportFilterProject"

export default function ReportSidebar() {
  console.log('Report sidebar render')
  return <section className='report-sidebar space-y-3'>
    <ReportFilterProject />
    <ReportFilterMember />
  </section>
}
