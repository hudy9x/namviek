import { Router } from 'express'
import { AuthRequest } from '../../types'
import { TaskPoint } from '@prisma/client'
import { mdTaskPointAddOne, mdTaskPointGetByProjectId } from '@shared/models'

const router = Router()

router.post('/project/setting/point', async (req: AuthRequest, res) => {
	const body = req.body as Pick<TaskPoint, 'point' | 'projectId' | 'icon'>
	try {
		const result = await mdTaskPointAddOne({
			...body
		})
		res.json({
			status: 200,
			data: result
		})
	} catch (e) {
		res.json({
			status: 400,
			error: e
		})
	}
})

router.get('/project/setting/point', async (req: AuthRequest, res) => {
	// const body = req.body as Pick<TaskPoint, 'projectId'>;
	const { projectId } = req.params as Pick<TaskPoint, 'projectId'>

	const result = await mdTaskPointGetByProjectId(projectId)
	res.json({
		status: 200,
		data: result
	})
})
export default router
