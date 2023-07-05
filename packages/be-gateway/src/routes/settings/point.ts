import { Router } from 'express';
import { AuthRequest } from '../../types';
import { TaskPoint } from '@prisma/client';
import { mdTskPointAdd, mdTskPointGet } from '@shared/models';

const router = Router();

router.post('/setting/point', async (req: AuthRequest, res) => {
	const body = req.body as Pick<TaskPoint, 'point' | 'projectId'>;
	// console.log('point data:', body);

	const result = await mdTskPointAdd({
		...body
	});

	res.json({
		status: 200,
		data: result
	});
});

router.get('/setting/point', async (req: AuthRequest, res) => {
	const body = req.body as Pick<TaskPoint, 'projectId'>;

	const result = await mdTskPointGet(body.projectId);
	res.json({
		status: 200,
		data: result
	});
});
export default router;
