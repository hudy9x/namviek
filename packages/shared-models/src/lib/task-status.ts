import { TaskStatus } from "@prisma/client"
import { taskStatusModal } from "./_prisma"
import { ObjectId } from "bson"

export const mdStatusAdd = async (data: Omit<TaskStatus, 'id'>) => {

	return taskStatusModal.create({
		data: {...data}
	})
}

export const mdStatusGetAll = async (projectId: string) => {
 return taskStatusModal.findMany({
  where: {
			projectId
		}
 })
}

export const mdStatusDel =async (id : string) => {
 return taskStatusModal.delete({
  where: {
   id,
  }
 })
}
