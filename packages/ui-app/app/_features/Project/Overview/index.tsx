import OverviewWorkloadByStatus from './OverviewWorkloadByStatus'
import OverviewDateRange from './OverviewDateRange'
import './style.css'
import OverviewMemberProgress from './OverviewMemberProgress'
import OverviewTask from './OverviewTasks'
import { useUser } from '@goalie/nextjs'
import OverviewBurnoutChart from './OverviewBurnoutChart'

export default function ProjectOverview() {
  const { user } = useUser()
  return (
    <div id="overview" className="mx-auto w-[1130px]">
      <header className="py-3 p-4 bg-white border rounded-md my-3">
        <h2 className="text-gray-800 font-bold text-2xl">Hi, {user?.name}</h2>
        <p className="text-gray-600 text-sm mt-2">{`Welcome back to Overview dashboard. Have a bird's eye view of your project`}</p>
      </header>
      <main className="flex items-start gap-3">
        <div className="left-section w-full">
          <OverviewWorkloadByStatus />
          <OverviewTask />
          <OverviewBurnoutChart/>
        </div>
        <div className="right-section w-[310px] shrink-0">
          <OverviewDateRange />
          <OverviewMemberProgress />
        </div>
      </main>

      <div className="mt-3">
        <div></div>
      </div>
    </div>
  )
}
