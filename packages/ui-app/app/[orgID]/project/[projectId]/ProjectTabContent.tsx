'use client'

import ProjectOverview from '@/features/Project/Overview'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import ProjectContentLoading from './ProjectContentLoading'
import TaskList from './TaskList'
import { useProjectViewStore } from '@/store/projectView'
import { ProjectViewType } from '@prisma/client'
import { Loading } from '@shared/ui'
import { useProjectStatusStore } from '@/store/status'
import { projectViewMap } from '@/features/ProjectView/useProjectViewList'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useId } from 'react'

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

function AnimateView({
  visible,
  children
}: {
  visible: boolean
  children: React.ReactNode
}) {
  if (!visible) return null
  return <>{children}</>
  // const id = useId()
  // return (
  //   <AnimatePresence>
  //     {visible ? (
  //       <motion.div
  //         key={id}
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         exit={{ opacity: 0 }}>
  //         {children}
  //       </motion.div>
  //     ) : null}
  //   </AnimatePresence>
  // )
}

export default function ProjectTabContent() {
  const { loading } = useProjectViewStore()
  const { statusLoading } = useProjectStatusStore()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const ignored = ['setting', 'automation', 'automation-create']
  const isIgnored = () => ignored.includes(mode || '')

  console.log('mode', mode)

  const type = projectViewMap.get(mode || '') || 'NONE'

  const isView = (t: ProjectViewType) => !isIgnored() && type === t
  const isNotBoard = !isView(ProjectViewType.BOARD)

  // Note: only enable overflow-y to Board view
  // to keep the scrollbar inside tabcontent
  // not the whole page
  const cls = `relative ${isNotBoard ? 'overflow-y-auto' : null}`

  return (
    <div className={cls} style={{ height: 'calc(100vh - 83px)' }}>
      {loading || statusLoading ? (
        <div className="px-3">
          <Loading.Absolute title="Preparing view ..." enabled={true} />
        </div>
      ) : null}
      <AnimateView visible={type === 'NONE' && !isIgnored()}>
        <TaskList />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.BOARD)}>
        <Board />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.LIST)}>
        <TaskList />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.CALENDAR)}>
        <Calendar />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.GOAL)}>
        <Vision />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.DASHBOARD)}>
        <ProjectOverview />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.TEAM)}>
        <DynamicTeamView />
      </AnimateView>
      {/* {type === 'NONE' && !isIgnored() && <TaskList />} */}
      {/* {isView(ProjectViewType.BOARD) && <Board />} */}
      {/* {isView(ProjectViewType.LIST) && <TaskList />} */}
      {/* {isView(ProjectViewType.DASHBOARD) ? <ProjectOverview /> : null} */}
      {/* {isView(ProjectViewType.CALENDAR) ? <Calendar /> : null} */}
      {/* {isView(ProjectViewType.TEAM) ? <DynamicTeamView /> : null} */}
      {/* {isView(ProjectViewType.GOAL) ? <Vision /> : null} */}
      {mode === 'setting' && <Settings />}
      {mode === 'automation-create' ? <Automation /> : null}
      {mode === 'automation' ? <AutomateMenu /> : null}
    </div>
  )
}
