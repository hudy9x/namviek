'use client'

import { ThemeProvider } from 'next-themes'

export default function RootLayoutComp({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="root-container">{children}</div>
    </ThemeProvider>
  )
}
