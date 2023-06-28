import { Router } from 'express';
import authRouter from './auth';
import orgRouter from './organization';

const router = Router();

// middlewares
// router.use([])
router.use(authRouter);
router.use(orgRouter);

export default router;
