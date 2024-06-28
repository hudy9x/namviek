import { Router } from 'express'
import authRouter from './auth'
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
import CommentRouer from './comment'

// import "./test";
import ProjectController from './project/project.controller'
import ProjectViewController from './project/view'
import PermissionController from './auth/permission.controller'

import { AppRoutes } from '../core/AppRoutes'

import { OrganizationStorageController } from './organization/storage.controller'
import { OrganizationController } from './organization/index.controller'
import { OrganizationMemberController } from './organization/member.controller'
import { SchedulerController } from './scheduler/index.controller'
import TaskReorderController from './task/reorder.controller'
import { EventController } from './event/index.controller'
import { TestController } from './test'
import ProjectSetting from './project/setting.controller'
import TaskChecklistController from './task/checklist.controller'
import ReportController from './report'
import { createModuleLog } from '../lib/log'

const router = Router()
const logger = createModuleLog('Request')

router.use((req, res, next) => {
  logger.info(req.url, {
    method: req.method,
    url: req.url,
    path: req.path
  })
  console.log('\x1b[0m', `🥝 ${req.method}: ${req.url}`, '\x1b[90m')
  next()
})

router.use(
  AppRoutes([
    TestController,
    ProjectController,
    ActivityRouter,
    CommentRouer,
    EventController,
    ProjectViewController,
    ProjectSetting,
    PermissionController,
    OrganizationController,
    OrganizationStorageController,
    OrganizationMemberController,
    SchedulerController,
    TaskReorderController,
    TaskChecklistController,
    ReportController
  ])
)
// middlewares
// router.use([])
router.use(meetingRouter)
router.use(buzzerRouter)
router.use('/storage', [authMiddleware, storageRouter])
router.use(visionRouter)
router.use(authRouter)
router.use(favRouter)
router.use(automationRouter)
router.use(dboardRouter)
// router.use(orgRouter)
router.use(projectRouter)
router.use(projectMemberRouter)
router.use(taskRouter)

export default router
