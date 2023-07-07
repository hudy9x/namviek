import { create } from 'zustand';
import { TaskPoint } from '@prisma/client';
import { produce } from 'immer';

interface ProjectPointState {
  points: TaskPoint[];
  addAllPoints: (data: TaskPoint[]) => void;
}

export const useProjectPointStore = create<ProjectPointState>(set => ({
  points: [],
  addAllPoints: (data: TaskPoint[]) =>
    set(
      produce((state: ProjectPointState) => {
        state.points = data;
      })
    )
}));
