'use client'

import { useSearchParams } from 'next/navigation'
import TaskList from './TaskList'
import Settings from './settings'
import { Board } from './board'
import Calendar from './calendar'
import ProjectOverview from 'packages/ui-app/app/_features/Project/Overview'
import Automation from '@/features/Automation'
import AutomateList from '@/features/Automation/AutomateList'

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
      {mode === 'automation-create' ? <Automation /> : null}
      {mode === 'automation' ? <AutomateList /> : null}
    </div>
  )
}
