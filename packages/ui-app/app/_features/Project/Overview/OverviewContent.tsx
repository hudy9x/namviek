import OverviewWorkloadByStatus from './OverviewWorkloadByStatus'
import OverviewDateRange from './OverviewDateRange'
import './style.css'
import OverviewMemberProgress from './OverviewMemberProgress'
import OverviewTask from './OverviewTasks'
import { useUser } from '@goalie/nextjs'
import OverviewBurnoutChart from './OverviewBurnoutChart'
import OverviewWorkloadByDate from './OverviewWorkloadByDate'
import { Button } from '@shared/ui'
import {
  dboardComponentCreate,
  dboardCreate,
  dboardGet
} from '@/services/dashboard'
import { useParams } from 'next/navigation'
import { DashboardComponent, DashboardComponentType } from '@prisma/client'
import { useEffect, useState } from 'react'
import DbCompSummary from '../../Dashboard/components/DbCompSummary'
import DbComponent from '../../Dashboard/components/DbComponent'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export default function OverviewContent() {
  const { user } = useUser()
  const { projectId } = useParams()
  const [components, setComponents] = useState<DashboardComponent[]>([])

  useEffect(() => {
    console.log('start getting dashboard components')
    dboardGet(projectId)
      .then(res => {
        const { data, status } = res.data

        if (status !== 200) {
          return
        }

        setComponents(data)
        console.log('components', data)
      })
      .catch(err => {
        console.log('get dboard error', err)
      })
  }, [])

  const onCreateDashboard = () => {
    dboardCreate({ projectId, title: 'Unknown ' + Date.now() }).then(res => {
      console.log('dboard create', res)
    })
  }

  const onCreateComponent = () => {
    dboardComponentCreate({
      dashboardId: '64c63e9ca7952f78aec87814',
      title: 'Today tasks',
      type: DashboardComponentType.SUMMARY,
      config: {
        date: ['=', 'today']

        // startDate: new Date(2023, 6, 22).toString(),
        // endDate: new Date(2023, 6, 22).toString()

        // statusIds: ['64a2742810848bf6cbdd6e7d'],
        // projectIds: [projectId],
        // icon: '🔬'
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
      <div className="flex items-center justify-between">
        <div>
          {/* <Button title="Create dashboard" onClick={onCreateDashboard} /> */}
          <Button title="Create component" size='sm' onClick={onCreateComponent} />
        </div>
        <div className="flex items-center gap-1">
          <Button title="Day" size="sm" />
          <Button title="Week" size="sm" />
          <Button title="Month" size="sm" />
          <Button title="Prev" leadingIcon={<AiOutlineArrowLeft />} size="sm" />
          <Button title="Today" size="sm" />
          <Button
            title="Next"
            leadingIcon={<AiOutlineArrowRight />}
            size="sm"
          />
        </div>
      </div>
      <main className="mt-3">
        <div className="grid grid-cols-4 gap-3">
          {components.map(component => {
            return <DbComponent component={component} key={component.id} />
          })}
        </div>
        <div className="left-section w-full">
          {/* <OverviewWorkloadByStatus /> */}
          {/* <OverviewWorkloadByDate /> */}
          {/* <div className="grid grid-cols-5 gap-3"> */}
          {/*   <OverviewTask /> */}
          {/*   <OverviewBurnoutChart /> */}
          {/* </div> */}
        </div>
        <div className="right-section w-[310px] shrink-0">
          {/* <OverviewDateRange /> */}
          {/* <OverviewMemberProgress /> */}
        </div>
      </main>

      <div className="mt-3">
        <div></div>
      </div>
    </div>
  )
}
