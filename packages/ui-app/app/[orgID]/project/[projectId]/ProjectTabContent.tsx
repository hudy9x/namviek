'use client'

import ProjectOverview from '@/features/Project/Overview'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import ProjectContentLoading from './ProjectContentLoading'
import TaskList from './TaskList'
import { useProjectViewStore } from '@/store/projectView'
import { useMemo } from 'react'
import { ProjectViewType } from '@prisma/client'
import AbsoluteLoading from 'packages/shared-ui/src/components/Loading/AbsoluteLoading'
import { Loading } from '@shared/ui'

const DynamicTeamView = dynamic(() => import('@/features/Project/Team'), {
  loading: () => <ProjectContentLoading />
})
const Calendar = dynamic(() => import('./calendar'), {
  loading: () => <ProjectContentLoading />
})
const Board = dynamic(() => import('./board'), {
  loading: () => <ProjectContentLoading />
})

const Vision = dynamic(() => import('@/features/Project/Vision'), {
  loading: () => <ProjectContentLoading />
})

const Settings = dynamic(() => import('./settings'), {
  loading: () => <ProjectContentLoading />
})

const Automation = dynamic(() => import('@/features/Automation'), {
  loading: () => <ProjectContentLoading />
})

const AutomateList = dynamic(
  () => import('@/features/Automation/AutomateList'),
  {
    loading: () => <ProjectContentLoading />
  }
)

export default function ProjectTabContent() {
  const { views, loading } = useProjectViewStore()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const ignored = ['setting', 'automation', 'automation-create']
  const isIgnored = () => ignored.includes(mode || '')

  const type = useMemo(() => {
    const view = views.find(v => v.id === mode)
    return view ? view.type : 'NONE'
  }, [mode, JSON.stringify(views)])

  const isView = (t: ProjectViewType) => !isIgnored() && type === t

  return (
    <div className="overflow-y-auto relative" style={{ height: 'calc(100vh - 83px)' }}>
      <Loading.Absolute enabled={loading} />
      {type === 'NONE' && !isIgnored() && <TaskList />}
      {isView(ProjectViewType.BOARD) && <Board />}
      {/* {mode === 'board2' && <Board2 />} */}
      {isView(ProjectViewType.LIST) && <TaskList />}
      {isView(ProjectViewType.DASHBOARD) ? <ProjectOverview /> : null}
      {isView(ProjectViewType.CALENDAR) ? <Calendar /> : null}
      {isView(ProjectViewType.TEAM) ? <DynamicTeamView /> : null}
      {isView(ProjectViewType.GOAL) ? <Vision /> : null}
      {mode === 'setting' && <Settings />}
      {mode === 'automation-create' ? <Automation /> : null}
      {mode === 'automation' ? <AutomateList /> : null}
    </div>
  )
}
