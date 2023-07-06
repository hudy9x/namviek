import { create } from "zustand";
import { TaskStatus } from "@prisma/client";
import { produce } from "immer";

interface TaskStatusAll {
  [projectId: string]: TaskStatus[];
}
interface TaskStatusState {
	taskStatus: TaskStatusAll
	addTaskStatus: (data: TaskStatus) => void
  editTaskStatus: (data: TaskStatus) => void
  delTaskStatus: (projectId: string, id: number) => void
}

export const useTaskStatusStore = create<TaskStatusState>((set) => ({
  taskStatus: {},

  addTaskStatus: (data: TaskStatus) => set(produce((state: TaskStatusState) => {
		state.taskStatus[data.projectId].push(data)
	})),

  editTaskStatus: (data: Partial<TaskStatus>) => set(produce((state: TaskStatusState) => {
    state.taskStatus[data.projectId].forEach((status, index) => {
      if (data.id === status.id) {
        state.taskStatus[data.projectId][index] = {...data};
      }
    })
  })),
   
  delTaskStatus: (projectId: string, id: number) => set(produce((state: TaskStatusState) => {
    state.taskStatus[projectId] = state.taskStatus[projectId].filter((status) => status.id !== id);
  })),
}))