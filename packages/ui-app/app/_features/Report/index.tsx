'use client'

import { useOrgMemberGet } from '@/services/organizationMember'
import { TaskFilterProvider } from '../TaskFilter/context'
import ReportContent from './ReportContent'
import './style.css'

export default function Report() {
  useOrgMemberGet()

  return (
    <TaskFilterProvider>
      <ReportContent />
    </TaskFilterProvider>
  )
}
