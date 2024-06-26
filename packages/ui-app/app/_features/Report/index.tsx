'use client'

import { useOrgMemberGet } from '@/services/organizationMember'
import './style.css'
import ReportContent from './ReportContent'
import ReportSidebar from './ReportSidebar'
import { ReportProvider } from './context'
import ReportHeader from './ReportHeader'


function PrefetchData() {
  useOrgMemberGet()
  return null
}

export default function Report() {
  return (
    <ReportProvider>
      <PrefetchData />
      <ReportHeader />
      <div className='report-container flex items-start gap-3'>
        <ReportContent />
        <ReportSidebar />
      </div>
    </ReportProvider>
  )
}
