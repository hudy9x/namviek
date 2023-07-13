import { create } from 'zustand';
import { Project, TaskPriority } from '@prisma/client';
import { produce } from 'immer';

interface ProjectState {
  selectedProject: Project | null;
  priorities: TaskPriority[];
  projects: Project[];
  addProject: (data: Project) => void;
  addAllProject: (datas: Project[]) => void;
  selectProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>(set => ({
  priorities: [TaskPriority.LOW, TaskPriority.HIGH, TaskPriority.NORMAL, TaskPriority.URGENT],
  selectedProject: null,
  projects: [],

  addProject: (data: Project) =>
    set(
      produce((state: ProjectState) => {
        state.projects.push(data);
      })
    ),

  addAllProject: (datas: Project[]) =>
    set(
      produce((state: ProjectState) => {
        state.projects = datas;
      })
    ),

  selectProject: (id: string) =>
    set(
      produce((state: ProjectState) => {
        const project = state.projects.find(p => p.id === id);

        if (project) {
          state.selectedProject = project;
        }
      })
    )
}));
