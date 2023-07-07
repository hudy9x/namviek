import { Router } from 'express'
import authRouter from './auth'
import orgRouter from './organization'
import projectRouter from './project'
import projectSettingRouter from './projectSetting'

const router = Router()

// middlewares
// router.use([])
router.use(authRouter)
router.use(orgRouter)
router.use(projectRouter)
router.use(projectSettingRouter)

export default router
