'use client'

import MyworkCard from './MyworkCard'

export default function MyUpcomingTasks() {
  const evening = new Date()
  evening.setHours(23)
  evening.setMinutes(59)

  const query = {
    projectId: 'all',
    dueDate: [evening, 'undefined'],
    take: 5,
    counter: true
  }

  return <MyworkCard title="📆 Upcoming" query={query} />
}
