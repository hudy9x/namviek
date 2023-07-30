import OverviewWorkloadByStatus from './OverviewWorkloadByStatus'
import OverviewDateRange from './OverviewDateRange'
import './style.css'
import OverviewMemberProgress from './OverviewMemberProgress'
import OverviewTask from './OverviewTasks'
import { useUser } from '@goalie/nextjs'
import OverviewBurnoutChart from './OverviewBurnoutChart'
import OverviewWorkloadByDate from './OverviewWorkloadByDate'
import { Button } from '@shared/ui'
import { dboardComponentCreate, dboardCreate } from '@/services/dashboard'
import { useParams } from 'next/navigation'
import { DashboardComponentType } from '@prisma/client'

export default function OverviewContent() {
  const { user } = useUser()
  const { projectId } = useParams()


  const onCreateDashboard = () => {
    dboardCreate({ projectId, title: 'Unknown ' + Date.now() }).then(res => {
      console.log('dboard create', res)
    })
  }

  const onCreateComponent = () => {
    dboardComponentCreate({
      dashboardId: '64c63e9ca7952f78aec87814',
      title: 'Complete tasks',
      type: DashboardComponentType.SUMMARY,
      config: {
        statusIds: [''],
        projectId,
        icon: '🎄'
      }
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <div id="overview" className="mx-auto w-[1130px]">
      <header className="py-3 p-4 bg-white border rounded-md my-3">
        <h2 className="text-gray-800 font-bold text-2xl">Hi, {user?.name}</h2>
        <p className="text-gray-600 text-sm mt-2">{`Welcome back to Overview dashboard. Have a bird's eye view of your project`}</p>
      </header>
      <main className="flex items-start gap-3">
        <Button title='Create dashboard' onClick={onCreateDashboard} />
        <Button title='Create component' onClick={onCreateComponent} />
        <div className="left-section w-full">
          <OverviewWorkloadByStatus />
          <OverviewWorkloadByDate />
          <div className="grid grid-cols-5 gap-3">
            <OverviewTask />
            <OverviewBurnoutChart />
          </div>
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
