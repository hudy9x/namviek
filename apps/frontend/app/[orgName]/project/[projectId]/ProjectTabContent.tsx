'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import ProjectContentLoading from './ProjectContentLoading'
import { useProjectViewStore } from '@/store/projectView'
import { ProjectViewType } from '@prisma/client'
import { Loading } from '@ui-components'
import { projectViewMap } from '@/features/ProjectView/useProjectViewList'
import React, { useCallback, useMemo } from 'react'
import { useReRenderView } from '@/features/ProjectView/useReRenderView'

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

const Grid = dynamic(() => import('@/features/Project/GridView'), {
  loading: () => <ProjectContentLoading />
})

const Settings = dynamic(() => import('./settings'), {
  loading: () => <ProjectContentLoading />
})

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

function ProjectTabContentLoading() {

  const { loading } = useProjectViewStore()

  if (loading) {
    return <div className="px-3">
      <Loading.Absolute title="Preparing view ..." enabled={true} />
    </div>
  }

  return null
}

export default function ProjectTabContent() {
  const searchParams = useSearchParams()
  const { counter } = useReRenderView()
  const mode = searchParams.get('mode')

  const isIgnored = useCallback(() => {
    const ignored = ['setting']
    return ignored.includes(mode || '')
  }, [mode])

  const type = projectViewMap.get(mode || '') || 'NONE'

  const isView = useCallback((t: ProjectViewType) => !isIgnored() && type === t, [isIgnored, type])
  const isNotBoard = !isView(ProjectViewType.BOARD)

  // Note: only enable overflow-y to Board view
  // to keep the scrollbar inside tabcontent
  // not the whole page
  const cls = `relative ${isNotBoard ? 'overflow-y-auto' : null}`

  const view = useMemo(() => {
    return <div className={cls} style={{ height: 'calc(100vh - 83px)' }}>
      <ProjectTabContentLoading />
      <AnimateView visible={type === 'NONE' && !isIgnored()}>
        <>Preparing the view</>
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.BOARD)}>
        <Board />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.GRID)}>
        <Grid />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.LIST)}>
        This is the list view
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.CALENDAR)}>
        <Calendar />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.GOAL)}>
        <Vision />
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.DASHBOARD)}>
        This is dashboard view
      </AnimateView>
      <AnimateView visible={isView(ProjectViewType.TEAM)}>
        <DynamicTeamView />
      </AnimateView>
      {mode === 'setting' && <Settings />}
    </div>
  }, [cls, type, isIgnored, mode, isView, counter])

  return view
}
