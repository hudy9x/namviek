import { Router } from 'express';
import authRouter from './auth';
import orgRouter from './organization';
import projectRouter from './project';
import settings from './settings';

const router = Router();

// middlewares
// router.use([])
router.use(authRouter);
router.use(orgRouter);
router.use(projectRouter);
router.use(settings);

export default router;
