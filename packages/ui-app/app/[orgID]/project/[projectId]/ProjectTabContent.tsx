'use client'

import ProjectOverview from '@/features/Project/Overview'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import ProjectContentLoading from './ProjectContentLoading'
import TaskList from './TaskList'
import { useProjectViewStore } from '@/store/projectView'
import { useEffect, useMemo, useState } from 'react'
import { ProjectViewType } from '@prisma/client'
import AbsoluteLoading from 'packages/shared-ui/src/components/Loading/AbsoluteLoading'
import { Loading } from '@shared/ui'
import { useDebounce } from '@/hooks/useDebounce'
import { getLocalCache, setLocalCache } from '@shared/libs'
import { useProjectStatusStore } from '@/store/status'
import { projectViewMap } from '@/features/ProjectView/useProjectViewList'

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

const AutomateMenu = dynamic(
  () => import('@/features/Automation/AutomateMenu'),
  {
    loading: () => <ProjectContentLoading />
  }
)

export default function ProjectTabContent() {
  const { loading } = useProjectViewStore()
  const { statusLoading } = useProjectStatusStore()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const ignored = ['setting', 'automation', 'automation-create']
  const isIgnored = () => ignored.includes(mode || '')

  const type = projectViewMap.get(mode || '') || 'NONE'

  const isView = (t: ProjectViewType) => !isIgnored() && type === t

  return (
    <div
      className="overflow-y-auto relative"
      style={{ height: 'calc(100vh - 83px)' }}>
      {loading || statusLoading ? (
        <div className="px-3">
          <Loading.Absolute title="Preparing view ..." enabled={true} />
        </div>
      ) : null}
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
      {mode === 'automation' ? <AutomateMenu /> : null}
    </div>
  )
}
