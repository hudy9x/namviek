import TaskFilter from '../TaskFilter'
import ReportMemberProgressChart from './ReporMemberProgressChart'
import ReportWorkProgressChart from './ReporWorkProgressChart'
import ReportTotalTask from './ReportTotalTask'

export default function ReportLayout() {
  return (
    <div className="h-screen bg-indigo-50/50">
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 py-[15px]">
        <div className="w-[900px] mx-auto">
          <h2 className="text-gray-600 dark:text-gray-300 font-bold text-xl">
            Report section
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Where you can summarize the project status for overview and analysis
          </p>
        </div>
      </header>
      <TaskFilter
        searchEnabled={false}
        pointEnabled={false}
        assigneeEnable={false}
        importEnable={false}
      />
      <div className='h-[calc(100vh-106px)] dark:bg-[#182031]'>
        <div className="mx-auto w-[900px] grid grid-cols-3 gap-2 py-8">
          <ReportTotalTask />
          <div className="report-box col-span-2">
            <ReportMemberProgressChart />
          </div>
          <div className="report-box">
            <ReportWorkProgressChart />
          </div>
        </div>
      </div>
    </div>
  )
}
