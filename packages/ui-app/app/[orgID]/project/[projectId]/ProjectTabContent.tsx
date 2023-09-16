'use client'

import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import TaskList from './TaskList'
import Settings from './settings'
import { Board } from './board'
import Calendar from './calendar'
import ProjectOverview from 'packages/ui-app/app/_features/Project/Overview'
import { useTaskSelectContext } from './TaskSelectContext'
import TaskSelectControl from './TaskSelectControl'

export default function ProjectTabContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const { clearSelectedTasks } = useTaskSelectContext()

  useEffect(() => {
    clearSelectedTasks()
  }, [mode])

  return (
    <div className="overflow-y-auto" style={{ height: 'calc(100vh - 83px)' }}>
      {mode === 'board' && <Board />}
      {mode === 'task' && <TaskList />}
      {mode === 'setting' && <Settings />}
      {mode === 'overview' ? <ProjectOverview /> : null}
      {mode === 'calendar' ? <Calendar /> : null}
      <TaskSelectControl />
    </div>
  )
}
