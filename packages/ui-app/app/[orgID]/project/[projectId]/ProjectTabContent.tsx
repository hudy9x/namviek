'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { LoadingSpinner } from 'packages/shared-ui/src/components/Loading'
import ProjectOverview from 'packages/ui-app/app/_features/Project/Overview'
import TaskList from './TaskList'
import { Board } from './board'
import Calendar from './calendar'
import Settings from './settings'

const DynamicTeamView = dynamic(() => import('@/features/Project/Team'), {
  loading: () => (
    <div
      className="absolute top-0 left-0 w-full z-20 flex items-center justify-center"
      style={{ height: 'calc(100vh - 83px)' }}>
      <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-3 rounded-md shadow-lg dark:shadow-gray-900 ">
        <div className="w-4 h-4">
          <LoadingSpinner />
        </div>
        <span>Loading ...</span>
      </div>
    </div>
  )
})

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
    </div>
  )
}
