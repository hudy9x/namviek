import { create } from 'zustand'
import { Task } from '@prisma/client'
import { produce } from 'immer'

interface TaskState {
  taskLoading: boolean
  setTaskLoading: (status: boolean) => void
  tasks: Task[]
  addOneTask: (data: Partial<Task>) => void
  updateTask: (data: Partial<Task>) => void
  syncRemoteTaskById: (id: string, data: Task) => void
  addAllTasks: (data: Task[]) => void
}

export const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  taskLoading: false,
  syncRemoteTaskById: (id: string, data: Task) =>
    set(
      produce((state: TaskState) => {
        const taskIndex = state.tasks.findIndex(t => t.id === id)

        if (!taskIndex) {
          return
        }

        state.tasks[taskIndex] = data
      })
    ),
  addOneTask: (data: Partial<Task>) =>
    set(
      produce((state: TaskState) => {
        state.tasks.push(data as Task)
        return state
      })
    ),
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
          updatedBy,
          startDate,
          createdAt
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

        if (startDate) {
          task.startDate = startDate
        }

        if (createdAt) {
          task.createdAt = createdAt
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
