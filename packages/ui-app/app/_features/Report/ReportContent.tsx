import ReportMemberStats from "./ReportMemberStats";
import ReportProjectStats from "./ReportProjectStats";

export default function ReportContent() {
  return <section className='report-content'>
    <ReportProjectStats />
    <ReportMemberStats />
  </section>
}
