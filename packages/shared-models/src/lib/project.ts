import { Project } from "@prisma/client"
import { projectModel } from "./_prisma"

export const addProject = async (data: Project) => {
	return projectModel.create({
		data: data
	})
}
