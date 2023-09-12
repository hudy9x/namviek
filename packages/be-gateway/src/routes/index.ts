import { Router } from 'express'
import authRouter from './auth'
import orgRouter from './organization'
import projectRouter from './project'
import projectMemberRouter from './member'
import taskRouter from './task'
import dboardRouter from './dashboard'
import { CKEY, findNDelCaches } from '../lib/redis'

const router = Router()

router.get('/cache/test', async (req, res, next) => {
  // await findCache([CKEY.TASK_QUERY, '649fe51e6c99940db7d13e36'])
  await findNDelCaches([CKEY.TASK_QUERY])
  res.send('done')
})
// middlewares
// router.use([])
router.use(authRouter)
router.use(dboardRouter)
router.use(orgRouter)
router.use(projectRouter)
router.use(projectMemberRouter)
router.use(taskRouter)

export default router
