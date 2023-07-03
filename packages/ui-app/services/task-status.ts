import { TaskStatus } from "@prisma/client"
import { httpGet, httpPost, httpDel } from './_req';

export const addStatus = ({ name, color, projectId }: Pick<TaskStatus, 'name' | 'color' | 'projectId'>) => {
	const body = {
		name,
		color
	}
	return httpPost(`/api/task-status/${projectId}`, body)
}

export const getAllStatus = ({ projectId } : Pick<TaskStatus, 'projectId'> ) => {
	return httpGet(`/api/task-status/${projectId}`)
}

export const delStatus = ({ id, projectId }: Pick<TaskStatus, 'projectId' | 'id'>) => {
	return httpDel(`/api/task-status/${projectId}/${id}`)
}
