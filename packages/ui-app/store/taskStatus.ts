import { create } from "zustand";
import { TaskStatus } from "@prisma/client";
import { produce } from "immer";

interface TaskStatusState {
	taskStatus: TaskStatus[]
	projectStatusAddStore: (data: TaskStatus) => void
  projectUpdateStatusStore: (id: string ,newData: Partial<TaskStatus>) => void
  projectStatusDelStore: (id: string) => void
  projectUpdateAllStatus: (newData: TaskStatus[]) => void
}

export const useTaskStatusStore = create<TaskStatusState>((set) => ({
  taskStatus: [],

  projectUpdateAllStatus: (newData) => set(produce((state: TaskStatusState) => {
    state.taskStatus = newData
	})),

  projectStatusAddStore: (data) => set(produce((state: TaskStatusState) => {
		state.taskStatus.push(data)
	})),

  projectUpdateStatusStore: (id ,newData) => set(produce((state: TaskStatusState) => {
    state.taskStatus.forEach((status, index) => {
      if (id === status.id) {
        state.taskStatus[index] = {...status, ...newData}
      }
    })
  })),
   
  projectStatusDelStore: (id) => set(produce((state: TaskStatusState) => {
    state.taskStatus = state.taskStatus.filter((status) => status.id !== id);
  })),
}))
