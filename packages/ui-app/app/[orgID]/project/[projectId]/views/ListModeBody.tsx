import React from 'react'
import { useListModeGroupContext } from './ListModeGroupContext'
import { useTaskStore } from '@/store/task'

export default function ListModeBody() {
  const { groups } = useListModeGroupContext()
  const { tasks } = useTaskStore()
  return (
    <>
      {groups.map(group => (
        <div key={group.title}>
          {/* group header */}
          <div>{group.title}</div>
          {/* group body */}
          {tasks
            .filter(task => group.isTaskOnGroup(task))
            .map(task => (
              <div key={task.id}>{task.title}</div>
            ))}
        </div>
      ))}
    </>
  )
}
