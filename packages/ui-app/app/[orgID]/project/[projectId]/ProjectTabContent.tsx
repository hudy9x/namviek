'use client'

import { useSearchParams } from 'next/navigation'
import TaskList from './TaskList'
import Settings from './settings'
import ProjectOverview from 'packages/ui-app/app/_features/Project/Overview'

export default function ProjectTabContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  return (
    <div className="overflow-y-auto" style={{ height: 'calc(100vh - 83px)' }}>
      {mode === 'overview' ? <ProjectOverview /> : null}
      {mode === 'task' ? <TaskList /> : null}
      {mode === 'setting' ? <Settings /> : null}
    </div>
  )
}
