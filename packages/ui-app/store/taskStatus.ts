import { create } from "zustand";
import { TaskStatus } from "@prisma/client";
import { produce } from "immer";

interface TaskStatusAll {
  [projectId: string]: TaskStatus[];
}
interface TaskStatusState {
	taskStatusAll: TaskStatusAll
  projectStatusInitialStore: (projectId: string) => void
	projectStatusAddStore: (data: TaskStatus) => void
  projectUpdateIdStatus: (oldId: string, newId: string, projectId: string) => void
  projectStatusEditStore: (data: Partial<TaskStatus>, projectId: string) => void
  projectStatusDelStore: (projectId: string, id: string) => void
}

export const useTaskStatusStore = create<TaskStatusState>((set) => ({
  taskStatusAll: {},

  projectStatusInitialStore: (projectId) => set(produce((state: TaskStatusState) => {
		state.taskStatusAll = {
      [projectId]: []
    } 
	})),

  projectUpdateIdStatus: (oldId, newId, projectId) => set(produce((state: TaskStatusState) => {
    state.taskStatusAll[projectId].forEach((status, index) => {
      if (oldId === status.id) {
        state.taskStatusAll[projectId][index] = {...status, id: newId}
      }
    })
  })),

  projectStatusAddStore: (data) => set(produce((state: TaskStatusState) => {
		state.taskStatusAll[data.projectId].push(data)
	})),

  projectStatusEditStore: (data, projectId) => set(produce((state: TaskStatusState) => {
    state.taskStatusAll[projectId].forEach((status, index) => {
      if (data.id === status.id) {
        state.taskStatusAll[projectId][index] = {...status, ...data}
      }
    })
  })),
   
  projectStatusDelStore: (projectId, id) => set(produce((state: TaskStatusState) => {
    state.taskStatusAll[projectId] = state.taskStatusAll[projectId].filter((status) => status.id !== id);
  })),
}))
