import { Router } from 'express'
import authRouter from './auth'
import projectRouter from './project'
import projectMemberRouter from './member'
import favRouter from './favorite'
import { storageRouter } from './storage'
import buzzerRouter from './buzzer'
import { authMiddleware } from '../middlewares'

// import "./test";
import ProjectController from './project/project.controller'
import ProjectViewController from './project/view'

import { AppRoutes } from '../core/AppRoutes'

import { OrganizationStorageController } from './organization/storage.controller'
import { OrganizationController } from './organization/index.controller'
import { OrganizationMemberController } from './organization/member.controller'
import { TestController } from './test'
import { createModuleLog } from '../lib/log'
import { LoadTestController } from './test/loadtest.controller'
import FieldController from './fields'
import GridController from './grid'
import { ApplicationController } from './apps/index.controller'
import PasswordController from './auth/password'

const router = Router()
const logger = createModuleLog('Request')

router.use((req, res, next) => {
  try {
    logger.info(req.url, {
      method: req.method,
      url: req.url,
      path: req.path
    })
    console.log('\x1b[0m', `🥝 ${req.method}: ${req.url}`, '\x1b[90m')
  } catch (error) {
    console.log()
  }
  next()
})

router.use(
  AppRoutes([
    TestController,
    LoadTestController,
    ProjectController,
    ProjectViewController,
    PasswordController,
    OrganizationController,
    OrganizationStorageController,
    OrganizationMemberController,
    GridController,
    ApplicationController,
    FieldController
  ])
)
// middlewares
// router.use([])
router.use(buzzerRouter)
router.use('/storage', [authMiddleware, storageRouter])
router.use(authRouter)
router.use(favRouter)
router.use(projectRouter)
router.use(projectMemberRouter)

export default router
