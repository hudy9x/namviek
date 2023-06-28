import { Organization } from '@prisma/client';
import { Router } from 'express';
import { authMiddleware } from '../../middlewares';
import { AuthRequest } from '../../types';

const router = Router();

router.use([authMiddleware])

router.post('/auth/org', async (req: AuthRequest, res) => {
	try {
		const body = req.body as Pick<Organization, 'name' | 'desc'>;

    console.log('called organization')
    console.log(body)
    console.log(req.authen)

    // const result = await mdOrgAdd({
    //   name: body.name,
    //   desc: body.desc,
    //   cover: null,
    //   avatar: null,
    // })

		res.json({ status: 200 });
	} catch (error) {
		console.log(error);
		res.json({ status: 500, error });
	}
});

export default router;
