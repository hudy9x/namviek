import { create } from "zustand";
import { Project } from "@prisma/client";

interface ProjectState {
	projects: Project[]
	addProject: (data: Project) => void
	addAllProject: (datas: Project[]) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
	projects: [],

	addProject: (data: Project) => set((state: ProjectState) => {
		state.projects.push(data)
		return state
	}),

	addAllProject: (datas: Project[]) => set((state: ProjectState) => {
		state.projects = datas
		return state
	})

}))
