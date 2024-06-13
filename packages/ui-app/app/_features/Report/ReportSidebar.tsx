import ReportFilterProject from "./ReportFilterProject"

export default function ReportSidebar() {
  console.log('Report sidebar render')
  return <section className='report-sidebar'>
    <ReportFilterProject />
    <div className='report-member-filter'></div>
  </section>
}
