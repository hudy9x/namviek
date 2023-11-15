'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import TaskList from './TaskList'
import ProjectOverview from '@/features/Project/Overview'
import ProjectContentLoading from './ProjectContentLoading'
import { Loading } from '@shared/ui'

const DynamicTeamView = dynamic(() => import('@/features/Project/Team'), {
  loading: () => <Loading.Absolute className='h-[calc(100vh-83px)]'/>
})
const Calendar = dynamic(() => import('./calendar'), {
  loading: () => <Loading.Absolute className='h-[calc(100vh-83px)]'/>
})
const Board = dynamic(() => import('./board'), {
  loading: () => <Loading.Absolute className='h-[calc(100vh-83px)]'/>
})

const Vision = dynamic(() => import('@/features/Project/Vision'), {
  loading: () => <Loading.Absolute className='h-[calc(100vh-83px)]'/>
})

const Settings = dynamic(() => import('./settings'), {
  loading: () => <Loading.Absolute className='h-[calc(100vh-83px)]'/>
})

const Automation = dynamic(() => import('@/features/Automation'), {
  loading: () => <Loading.Absolute className='h-[calc(100vh-83px)]'/>
})

const AutomateList = dynamic(
  () => import('@/features/Automation/AutomateList'),
  {
    loading: () => <Loading.Absolute className='h-[calc(100vh-83px)]'/>
  }
)

export default function ProjectTabContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  return (
    <div className="overflow-y-auto" style={{ height: 'calc(100vh - 83px)' }}>
      {mode === 'board' && <Board />}
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
