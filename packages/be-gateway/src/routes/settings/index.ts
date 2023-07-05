import { Router } from 'express';
import { authMiddleware } from '../../middlewares';
import pointRouter from './point';

const router = Router();

router.use([authMiddleware]);
// router.use('/setting', function (req, res, next) {
// 	next();
// });

router.use(pointRouter);

export default router;
