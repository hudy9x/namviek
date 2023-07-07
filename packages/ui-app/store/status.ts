import { create } from 'zustand';
import { TaskStatus } from '@prisma/client';
import { produce } from 'immer';

interface ProjectStatusState {
  statuses: TaskStatus[];
  addAllStatuses: (data: TaskStatus[]) => void;
}

export const useProjectStatusStore = create<ProjectStatusState>(set => ({
  statuses: [],
  addAllStatuses: (data: TaskStatus[]) =>
    set(
      produce((state: ProjectStatusState) => {
        state.statuses = data;
      })
    )
}));
