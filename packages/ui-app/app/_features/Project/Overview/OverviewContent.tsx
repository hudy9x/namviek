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
import {
  DashboardComponent,
  DashboardComponentType,
  TaskPriority
} from '@prisma/client'
import { useEffect, useState } from 'react'
import DbCompSummary from '../../Dashboard/components/DbCompSummary'
import DbComponent from '../../Dashboard/components/DbComponent'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export default function OverviewContent() {
  const { user } = useUser()
  const { projectId } = useParams()
  const [components, setComponents] = useState<DashboardComponent[]>([])

  useEffect(() => {
    dboardGet(projectId)
      .then(res => {
        const { data, status } = res.data

        if (status !== 200) {
          return
        }

        console.log(data)

        setComponents(data)
      })
      .catch(err => {
        console.log('get dboard error', err)
      })
  }, [])

  const onCreateDashboard = () => {
    dboardCreate({ projectId, title: 'Unknown ' + Date.now() }).then(res => {
      console.log('a')
    })
  }

  const onCreateComponent = () => {
    dboardComponentCreate({
      dashboardId: '64c63e9ca7952f78aec87814',
      title: 'Task by Assignee',
      type: DashboardComponentType.COLUMN,
      config: {
        fixed: true,
        // priority: ['in', TaskPriority.URGENT],
        // statusIds: [
        //   'not_in',
        //   '64a2742810848bf6cbdd6e7e',
        //   '64a2742810848bf6cbdd6e7f'
        // ],

        projectIds: ['in', projectId],
        icon: '🥃'
      }
    }).then(res => {
      const { status, data } = res.data

      if (status !== 200) {
        return
      }

      setComponents(prev => [...prev, data])
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
          <Button
            title="Create component"
            size="sm"
            onClick={onCreateComponent}
          />
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
            // if (component.id !== '64c8af39eb0172646a4e91da') return null
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
