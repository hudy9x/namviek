'use client'

import ProjectOverview from '@/features/Project/Overview'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import ProjectContentLoading from './ProjectContentLoading'
import TaskList from './TaskList'

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
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  return (
    <div className="overflow-y-auto" style={{ height: 'calc(100vh - 83px)' }}>
      {mode === 'board' && <Board />}
      {/* {mode === 'board2' && <Board2 />} */}
      {mode === 'task' && <TaskList />}
      {mode === 'setting' && <Settings />}
      {mode === 'overview' ? <ProjectOverview /> : null}
      {mode === 'calendar' ? <Calendar /> : null}
      {mode === 'team' ? <DynamicTeamView /> : null}
      {mode === 'automation-create' ? <Automation /> : null}
      {mode === 'automation' ? <AutomateList /> : null}
      {mode === 'vision' ? <Vision /> : null}
    </div>
  )
}
