import { Router } from 'express'
import authRouter from './auth'
import orgRouter from './organization'
import projectRouter from './project'
import projectMemberRouter from './member'
import taskRouter from './task'
import dboardRouter from './dashboard'
import favRouter from './favorite'
import automationRouter from './automation'
import { storageRouter } from '@be/storage'

const router = Router()

// middlewares
// router.use([])
console.log('13')
router.use('/storage', storageRouter)
router.use(authRouter)
router.use(favRouter)
router.use(automationRouter)
router.use(dboardRouter)
router.use(orgRouter)
router.use(projectRouter)
router.use(projectMemberRouter)
router.use(taskRouter)

export default router
