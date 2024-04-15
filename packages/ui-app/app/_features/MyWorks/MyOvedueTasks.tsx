'use client'

import { ITaskQuery } from '@/services/task'
import MyworkCard from './MyworkCard'

export default function MyOvedueTasks() {
  const today = new Date()
  today.setHours(1)

  const query: ITaskQuery = {
    projectId: 'all',
    dueDate: ['undefined', today],
    done: 'no',
    take: 5,
    counter: true
  }

  return <MyworkCard title="🌋 Overdues" query={query} />
}
