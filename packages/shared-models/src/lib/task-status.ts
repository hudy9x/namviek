import { TaskStatus } from "@prisma/client"
import { taskStatusModal } from "./_prisma"

export const mdStatusAdd = async (data: Omit<TaskStatus, 'id'>) => {

	return taskStatusModal.create({
		data: { ...data }
	})
}

export const mdStatusGetAll = async (projectId: string) => {
	return taskStatusModal.findMany({
		where: {
			projectId
		}
	})
}

export const mdStatusUpdate = async (id: string, data: TaskStatus) => {
	return taskStatusModal.update({
		where: {
			id,
		},
		data: data
	})
}

export const mdStatusDel = async (id: string) => {
	return taskStatusModal.delete({
		where: {
			id,
		}
	})
}
