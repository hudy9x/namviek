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

type TProjectView = ProjectViewType | 'NONE'

export default function ProjectTabContent() {
  const { views, loading } = useProjectViewStore()
  const { statusLoading } = useProjectStatusStore()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const ignored = ['setting', 'automation', 'automation-create']
  const isIgnored = () => ignored.includes(mode || '')

  const key = `VIEW_MODE_${mode}`
  const getCacheViewMode = () => {
    const cached = getLocalCache(key) || 'NONE'
    return cached as TProjectView
  }

  const [type, setType] = useState<TProjectView>(getCacheViewMode())

  // const type = useMemo(() => {
  //   const view = views.find(v => v.id === mode)
  //   return view ? view.type : 'NONE'
  // }, [mode, JSON.stringify(views)])

  useDebounce(() => {
    if (views.length) {
      const view = views.find(v => v.id === mode)
      const t = view ? view.type : 'NONE'
      setType(t)
      setLocalCache(key, t)
    }
  }, [mode, JSON.stringify(views)])

  const isView = (t: ProjectViewType) => !isIgnored() && type === t

  return (
    <div
      className="overflow-y-auto relative"
      style={{ height: 'calc(100vh - 83px)' }}>
      {loading || statusLoading ? (
        <div className="px-3">
          <Loading.Absolute enabled={true} />
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
