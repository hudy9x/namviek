import { Task } from '@prisma/client'
import React, { useContext, useState, useCallback, createContext } from 'react'

interface ITaskSelectContext {
  selectedTasks: Task[]
  toggleTaskSelect: (task: Task) => void
  selectTasks: (ids: Task[]) => void
  unselectTasks: (ids: Task[]) => void
}

const TaskSelectContext = createContext<ITaskSelectContext>(
  {} as ITaskSelectContext
)

export function TaskSelectProvider({ children }: React.PropsWithChildren) {
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([])

  const toggleTaskSelect = useCallback((task: Task) => {
    setSelectedTasks(prev => {
      const idx = prev.findIndex(t => t.id === task.id)

      if (idx === -1) return [...prev, task]
      return [...prev.filter(t => t.id !== task.id)]
    })
  }, [])

  const selectTasks = useCallback((tasks: Task[]) => {
    setSelectedTasks(prev => {
      const taskMap = new Map<string, Task>()
      prev.forEach(task => taskMap.set(task.id, task))
      tasks.forEach(task => taskMap.set(task.id, task))
      return Array.from(taskMap.values())
    })
  }, [])

  const unselectTasks = useCallback((tasks: Task[]) => {
    setSelectedTasks(prev => {
      const ids = tasks.map(task => task.id)
      const newTasks = prev.filter(({ id }) => !ids.includes(id))
      return newTasks
    })
  }, [])

  return (
    <TaskSelectContext.Provider
      value={{
        selectedTasks,
        toggleTaskSelect,
        selectTasks,
        unselectTasks
      }}>
      {children}
    </TaskSelectContext.Provider>
  )
}

export function useTaskSelectContext() {
  return { ...useContext(TaskSelectContext) }
}
