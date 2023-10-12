'use client'

import { useOrgMemberGet } from '@/services/organizationMember'
import TaskFilter from '../TaskFilter'
import { TaskFilterProvider } from '../TaskFilter/context'
import ReportContent from './ReportContent'
import './style.css'

export default function Report() {
  useOrgMemberGet()

  return (
    <TaskFilterProvider>
      <TaskFilter
        searchEnabled={false}
        pointEnabled={false}
        assigneeEnable={false}
        importEnable={false}
      />
      <ReportContent />
    </TaskFilterProvider>
  )
}
