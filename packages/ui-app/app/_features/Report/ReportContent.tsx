import ReportHeader from "./ReportHeader";
import ReportProjectStats from "./ReportProjectStats";

export default function ReportContent() {
  return <section className='report-content'>
    <ReportHeader />
    <ReportProjectStats />
    <div className='report-member-stats'></div>
  </section>
}
