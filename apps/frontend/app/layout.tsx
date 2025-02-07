// app/layout.tsx
import './global.css'
import './darkmode.css'
import { Inter } from 'next/font/google'
import RootLayoutComp from '../layouts/RootLayout'
import { GoalieProvider } from '@auth-client'

import dynamic from 'next/dynamic'
import GoogleAnalytics from './_components/GA'
import { CSPostHogProvider } from './providers'
const inter = Inter({ subsets: ['latin'] })

const PushNotification = dynamic(
  () => import('./_components/PushNotification'),
  { ssr: false }
)

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'An open source task management for startups with low budget'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CSPostHogProvider>
      <GoalieProvider>
        <html lang="en">
          <head>
            <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
          </head>
          <body className={inter.className}>
            <RootLayoutComp>{children}</RootLayoutComp>
            <PushNotification />
            <GoogleAnalytics />
          </body>
        </html>
      </GoalieProvider>
    </CSPostHogProvider>
  )
}
