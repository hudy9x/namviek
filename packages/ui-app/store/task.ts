import { create } from 'zustand';
import { Task } from '@prisma/client';
import { produce } from 'immer';

interface TaskState {
  tasks: Task[];
  addAllTasks: (data: Task[]) => void;
  addTasks: (data: Task[]) => void;
}

export const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  addAllTasks: (data: Task[]) =>
    set(
      produce((state: TaskState) => {
        state.tasks = data;
      })
    ),
  addTasks: (data: Task[]) => 
  set(
    produce((state: TaskState) => {
      state.tasks = [ ...state.tasks, ...data ];
    })
  )
}));
