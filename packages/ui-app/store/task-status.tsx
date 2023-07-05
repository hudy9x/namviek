import { create } from "zustand";
import { TaskStatus } from "@prisma/client";
import { produce } from "immer";

interface TaskStatusState {
	taskStatusArr: TaskStatus[]
	addTaskStatus: (data: TaskStatus) => void
  editTaskStatus: (data: TaskStatus) => void
}

export const useProjectStore = create<TaskStatusState>((set) => ({
  taskStatusArr: [],

  addTaskStatus: (data: TaskStatus) => set(produce((state: TaskStatusState) => {
		state.taskStatusArr.push(data)
	})),

  editTaskStatus: (data: TaskStatus) => set(produce((state: TaskStatusState) => {
    state.taskStatusArr.forEach((status, index) => {
      if (data.id === status.id) {
        state.taskStatusArr[index] = {...data};
      }
    })
  })),
   
  deleteTaskStatus: (id: string) => set(produce((state: TaskStatusState) => {
    state.taskStatusArr = state.taskStatusArr.filter((status) => status.id !== id);
  })),
}))