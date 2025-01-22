import { Router } from 'express';
import { authMiddleware } from '../../middlewares';
import { AuthRequest } from '../../types';

const router = Router();

router.use([authMiddleware]);

// It means GET:/api/example
router.get('/example', (req: AuthRequest, res) => {
	res.json({ status: 200 });
});

// It means POST:/api/example
router.post('/example', (req: AuthRequest, res) => {
	console.log('auth user', req.authen);
	res.json({ status: 200 });
});

export default router;
