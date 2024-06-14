'use client'

import { useOrgMemberGet } from '@/services/organizationMember'
import './style.css'
import ReportContent from './ReportContent'
import ReportSidebar from './ReportSidebar'
import { ReportProvider } from './context'


function PrefetchData() {
  useOrgMemberGet()
  return null
}

export default function Report() {
  return (
    <ReportProvider>
      <PrefetchData />
      <ReportContent />
      <ReportSidebar />
    </ReportProvider>
  )
}
