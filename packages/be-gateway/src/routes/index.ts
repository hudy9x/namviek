import { Router } from 'express';
import authRouter from './auth';
import orgRouter from './organization';
import projectRouter from "./project";

const router = Router();

// middlewares
// router.use([])
router.use(authRouter);
router.use(orgRouter);
router.use(projectRouter)

export default router;
