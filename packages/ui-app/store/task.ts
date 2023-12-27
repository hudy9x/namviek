import { create } from 'zustand'
import { Task } from '@prisma/client'
import { produce } from 'immer'

export type PartialTask = Partial<Task>
export type ExtendedTask = Task & {
  selected: boolean
}

interface TaskState {
  selected: string[]
  taskLoading: boolean
  toggleSelected: (id: string) => void
  toggleMultipleSelected: (status: boolean, ids: string[]) => void
  clearAllSelected: () => void
  setTaskLoading: (status: boolean) => void
  tasks: ExtendedTask[]
  addOneTask: (data: PartialTask) => void
  updateMultipleTask: (data: PartialTask) => void
  updateTask: (data: PartialTask) => void
  syncRemoteTaskById: (id: string, data: Task) => void
  addAllTasks: (data: Task[]) => void
  addTasks: (data: Task[]) => void
  delTask: (id: string) => void
}

export const useTaskStore = create<TaskState>(set => ({
  selected: [],
  tasks: [],
  taskLoading: false,
  clearAllSelected: () =>
    set(
      produce((state: TaskState) => {
        state.selected = []
        state.tasks = state.tasks.map(task => {
          task.selected = false
          return task
        })
      })
    ),
  toggleMultipleSelected: (stt: boolean, ids: string[]) =>
    set(
      produce((state: TaskState) => {
        if (stt) {
          const newSelected = new Set([...state.selected, ...ids])
          state.selected = Array.from(newSelected)
        } else {
          state.selected = state.selected.filter(s => !ids.includes(s))
        }

        // console.log(
        //   JSON.parse(
        //     JSON.stringify(
        //       state.tasks.map(t => ({ id: t.id, selected: t.selected }))
        //     )
        //   )
        // )

        state.tasks = state.tasks.map(task => {
          if (ids.includes(task.id)) {
            task.selected = stt
          }
          return task
        })

        // console.log(
        //   JSON.parse(
        //     JSON.stringify(
        //       state.tasks.map(t => ({ id: t.id, selected: t.selected }))
        //     )
        //   )
        // )
      })
    ),
  toggleSelected: (id: string) =>
    set(
      produce((state: TaskState) => {
        const found = state.selected.findIndex(s => s === id)
        const foundTask = state.tasks.findIndex(t => t.id === id)

        let stt = false
        if (found !== -1) {
          state.selected = state.selected.filter(s => s !== id)
        } else {
          stt = true
          state.selected.push(id)
        }

        if (foundTask !== -1) {
          state.tasks[foundTask].selected = stt
        }
      })
    ),
  syncRemoteTaskById: (id: string, data: Task) =>
    set(
      produce((state: TaskState) => {
        const taskIndex = state.tasks.findIndex(t => t.id === id)

        if (taskIndex === -1) {
          return
        }

        state.tasks[taskIndex] = { ...data, selected: false }
      })
    ),
  delTask: (id: string) =>
    set(
      produce((state: TaskState) => {
        state.tasks = state.tasks.filter(t => {
          return t.id !== id
        })
      })
    ),
  addOneTask: (data: Partial<Task>) =>
    set(
      produce((state: TaskState) => {
        const newTask = { ...data, selected: false } as ExtendedTask
        state.tasks.push(newTask)
        return state
      })
    ),
  updateMultipleTask: (data: PartialTask) =>
    set(
      produce((state: TaskState) => {
        const selected = state.selected
        if (!selected.length) return

        const map = new Map()
        selected.forEach(s => map.set(s, true))

        console.log('update multiple', selected, data)

        state.tasks = state.tasks.map(task => {
          if (!map.has(task.id)) return task

          return { ...task, ...data }
        })
      })
    ),
  updateTask: (data: Partial<Task>) =>
    set(
      produce((state: TaskState) => {
        const {
          id,
          cover,
          order,
          title,
          fileIds,
          taskStatusId,
          assigneeIds,
          priority,
          taskPoint,
          done,
          dueDate,
          visionId,
          updatedBy,
          progress
        } = data

        if (!id) return

        const taskIndex = state.tasks.findIndex(t => t.id === id)

        if (taskIndex === -1) return

        const task = state.tasks[taskIndex]

        task.done = !!done

        if (title) {
          task.title = title
        }

        if (order) {
          task.order = order
        }

        if (cover) {
          task.cover = cover
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

        if (progress) {
          task.progress = progress
        }

        if (fileIds) {
          const oldFileIds = task.fileIds
          task.fileIds = [...fileIds, ...oldFileIds]
        }

        if (visionId && task.visionId !== visionId) {
          task.visionId = visionId
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
        state.tasks = data.map(d => ({ ...d, selected: false }))
        return state
      })
    ),
  addTasks: (data: Task[]) =>
    set(
      produce((state: TaskState) => {
        const newDatas = data.map(d => ({
          ...d,
          selected: false
        })) as ExtendedTask[]

        state.tasks = [...state.tasks, ...newDatas]
      })
    )
}))
