import ReportProjectStats from "./ReportProjectStats";

export default function ReportContent() {
  return <section className='report-content'>
    <ReportProjectStats />
    <div className='report-member-stats'></div>
  </section>
}
