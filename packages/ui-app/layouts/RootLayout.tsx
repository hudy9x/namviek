'use client'

import { getLocalCache } from '@shared/libs'
import { ThemeProvider } from 'next-themes'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

export default function RootLayoutComp({
  children
}: {
  children: React.ReactNode
}) {
  // const compactMode = getLocalCache('COMPACT_MENU') ? 'compact-menu' : ''
  const compactMode = ''

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className={`root-container ${compactMode}`}>{children}</div>
    </ThemeProvider>
  )
}
