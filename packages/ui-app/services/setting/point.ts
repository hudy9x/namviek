import { TaskPoint } from '@prisma/client'
import { httpGet, httpPost } from '../_req'

export const taskPointCreate = (data: Pick<TaskPoint, 'point' | 'projectId'>) => {
	console.log({ data })
	return httpPost('/api/project/setting/point', data)
}

export const taskPointGet = (projectId: string) => {
	return httpGet('/api/project/setting/point', { params: { projectId } })
}
