'use client'

import MyworkCard from './MyworkCard'

export default function MyOvedueTasks() {
  const today = new Date()
  today.setHours(1)

  const query = {
    projectId: 'all',
    dueDate: ['undefined', today],
    take: 5,
    counter: true
  }

  return <MyworkCard title="🌋 Overdues" query={query} />
}
