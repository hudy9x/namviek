import ReportMemberProgressChart from './ReporMemberProgressChart'
import ReportWorkProgressChart from './ReporWorkProgressChart'

export default function ReportLayout() {
  return (
    <div className="h-screen bg-indigo-50/50 pt-[50px]">
      <div className="mx-auto w-[900px] grid grid-cols-3">
        <div className="report-box col-span-2">
          <ReportMemberProgressChart />
        </div>
        <div className="report-box">
          <ReportWorkProgressChart />
        </div>
      </div>
    </div>
  )
}
