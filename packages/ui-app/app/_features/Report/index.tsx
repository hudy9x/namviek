'use client'

import { useOrgMemberGet } from '@/services/organizationMember'
import './style.css'
import ReportContent from './ReportContent'
import ReportSidebar from './ReportSidebar'
import { ReportProvider } from './context'
import { useState } from 'react'

// export default function Report() {
//   useOrgMemberGet()
//
//   const [counter, setCounter] = useState(1)
//   return (
//     <ReportProvider value={{
//       counter,
//       setCounter
//     }}>
//       <div id='report-page'>
//         <main>
//           <ReportContent />
//           <ReportSidebar />
//         </main>
//       </div>
//
//     </ReportProvider>
//   )
// }

export default function Report() {
  useOrgMemberGet()

  return (
    <ReportProvider>
      <ReportContent />
      <ReportSidebar />
    </ReportProvider>
  )
}
