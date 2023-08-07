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
import DashboardComponentCreate from '../../Dashboard/DasboardComponentCreate'
import { LoadingSpinner } from 'packages/shared-ui/src/components/Loading'
import DboardComponentList from '../../Dashboard/DboardComponentList'
import { useOverviewContext } from './context'

export default function OverviewContent() {
  const { user } = useUser()
  const { projectId } = useParams()

  const { loading, setLoading, dboardId, setDboardId } = useOverviewContext()

  const onCreateDashboard = () => {
    setLoading(true)
    dboardCreate({
      projectId,
      title: 'Overview dashboard',
      isDefault: true
    })
      .then(res => {
        const { status, data } = res.data
        if (status !== 200) {
          setLoading(false)
          return
        }

        setDboardId(data ? data.id : null)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div id="overview" className="mx-auto w-[1130px] relative pt-3">
      {loading ? (
        <div
          className="absolute top-0 left-0 w-full z-20 flex items-center justify-center"
          style={{ height: 'calc(100vh - 83px)' }}>
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-md shadow-lg ">
            <div className="w-4 h-4">
              <LoadingSpinner />
            </div>
            <span>Loading ...</span>
          </div>
        </div>
      ) : null}

      {dboardId ? (
        <header className="py-3 p-4 bg-white border rounded-md mb-3 ">
          <h2 className="text-gray-800 font-bold text-2xl">Hi, {user?.name}</h2>
          <p className="text-gray-600 text-sm mt-2">{`Welcome back to Overview dashboard. Have a bird's eye view of your project`}</p>
        </header>
      ) : null}
      <div className="flex items-center justify-between">
        <div>
          {!loading && !dboardId ? (
            <Button
              title="Create dashboard"
              size="sm"
              onClick={onCreateDashboard}
            />
          ) : null}

          {dboardId ? <DashboardComponentCreate /> : null}
        </div>
      </div>
      <main className="mt-3">
        <DboardComponentList />
      </main>
    </div>
  )
}
