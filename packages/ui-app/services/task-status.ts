import { TaskStatus } from "@prisma/client"
import { httpGet, httpPost, httpDel, httpPut } from './_req';

export const addStatus = ({ name, color, projectId, order }: Pick<TaskStatus, 'name' | 'color' | 'projectId' | 'order'>) => {
	const body = {
		name,
		color,
		order
	}
	return httpPost(`/api/task-status/${projectId}`, body)
}

export const editStatus = ({ data, projectId }: {
	data: Partial<TaskStatus>,
	projectId: string
}) => {
	return httpPut(`/api/task-status/${projectId}`, data)
}

export const getAllStatus = ({ projectId } : Pick<TaskStatus, 'projectId'> ) => {
	return httpGet(`/api/task-status/${projectId}`)
}

export const delStatus = ({ id, projectId }: Pick<TaskStatus, 'projectId' | 'id'>) => {
	return httpDel(`/api/task-status/${projectId}/${id}`)
}
