import ReportWorkProgressChart from './ReporWorkProgressChart'

export default function ReportLayout() {
  return (
    <div className="mx-auto w-[900px] mt-[100px] grid grid-cols-3">
      <div className="box flex items-center justify-center">
        <ReportWorkProgressChart />
      </div>
    </div>
  )
}
