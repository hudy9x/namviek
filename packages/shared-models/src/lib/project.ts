import { Project } from "@prisma/client"
import { ObjectId } from "bson";
import { projectModel } from "./_prisma"

export const mdProjectAdd = async (data: Omit<Project, 'id'>) => {

	const id = new ObjectId().toString()
	return projectModel.create({
		data: {...data, ...{id}}
	})
}

export const mdProjectGetAll = async (uid: string) => {
	return projectModel.findMany({
		where: {
			
		}
	})
}
