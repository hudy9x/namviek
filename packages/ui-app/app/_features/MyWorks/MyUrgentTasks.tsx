'use client'

import { TaskPriority } from '@prisma/client'
import MyworkCard from './MyworkCard'

export default function MyUrgentTasks() {
  const morning = new Date()
  const evening = new Date()
  morning.setHours(0)
  evening.setHours(23)
  evening.setMinutes(59)

  const query = {
    projectId: 'all',
    priority: TaskPriority.URGENT,
    take: 5,
    counter: true
  }

  return <MyworkCard title="💣 Urgents" query={query} />
}
