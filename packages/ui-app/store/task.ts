import { create } from 'zustand'
import { Task } from '@prisma/client'
import { produce } from 'immer'

interface TaskState {
  taskLoading: boolean
  setTaskLoading: (status: boolean) => void
  tasks: Task[]
  updateTask: (data: Partial<Task>) => void
  addAllTasks: (data: Task[]) => void
}

export const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  taskLoading: false,
  updateTask: (data: Partial<Task>) =>
    set(
      produce((state: TaskState) => {
        console.log(data)

        const {
          id,
          title,
          taskStatusId,
          assigneeIds,
          priority,
          taskPoint,
          dueDate,
          updatedBy
        } = data

        if (!id) return

        const taskIndex = state.tasks.findIndex(t => t.id === id)

        if (!taskIndex) return

        const task = state.tasks[taskIndex]

        if (title) {
          task.title = title
        }

        if (taskStatusId) {
          task.taskStatusId = taskStatusId
        }

        if (assigneeIds) {
          task.assigneeIds = assigneeIds
        }

        if (priority) {
          task.priority = priority
        }

        if (taskPoint) {
          task.taskPoint = taskPoint
        }

        if (dueDate) {
          task.dueDate = dueDate
        }

        if (updatedBy) {
          task.updatedBy = updatedBy
        }

        task.updatedAt = new Date()
      })
    ),
  setTaskLoading: (status: boolean) =>
    set(
      produce((state: TaskState) => {
        state.taskLoading = status
      })
    ),
  addAllTasks: (data: Task[]) =>
    set(
      produce((state: TaskState) => {
        state.tasks = data
      })
    )
}))
