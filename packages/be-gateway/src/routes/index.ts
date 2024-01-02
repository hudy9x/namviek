import { Router } from 'express'
import authRouter from './auth'
import orgRouter from './organization'
import projectRouter from './project'
import projectMemberRouter from './member'
import taskRouter from './task'
import dboardRouter from './dashboard'
import favRouter from './favorite'
import automationRouter from './automation'
import reportRouter from './report'
import visionRouter from './vision'
// import { storageRouter } from '@be/storage'
import { storageRouter } from './storage'
import buzzerRouter from './buzzer'
import meetingRouter from './meeting'
import { authMiddleware } from '../middlewares'
import ActivityRouter from './activity'

// import "./test";
import AdminController from './test2'
import ProjectController from './project/project.controller'
import ProjectViewController from './project/view'

import { AppRoutes } from '../core/AppRoutes'
import { TestRouter } from './test'

const router = Router()

router.use((req, res, next) => {
  console.log('\x1b[0m', `🥝 ${req.method}: ${req.url}`, '\x1b[90m')
  next()
})

router.use(
  AppRoutes([
    AdminController,
    ProjectController,
    ActivityRouter,
    TestRouter,
    ProjectViewController
  ])
)
// middlewares
// router.use([])
router.use(meetingRouter)
router.use(buzzerRouter)
router.use('/storage', [authMiddleware, storageRouter])
router.use(visionRouter)
router.use(reportRouter)
router.use(authRouter)
router.use(favRouter)
router.use(automationRouter)
router.use(dboardRouter)
router.use(orgRouter)
router.use(projectRouter)
router.use(projectMemberRouter)
router.use(taskRouter)

export default router
