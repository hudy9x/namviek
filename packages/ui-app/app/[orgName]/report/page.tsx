import Report from '@/features/Report'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Report',
  description: 'Where to display report by time'
}

export default function Page() {
  return <Report />
}
