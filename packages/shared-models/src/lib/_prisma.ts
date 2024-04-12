import { PrismaClient } from '@prisma/client'

import { Logtail } from '@logtail/node'

const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN || '')

export const Log = logtail

export const pmClient = new PrismaClient()
export const pmTrans = pmClient.$transaction

export const projectModel = pmClient.project
export const projectViewModel = pmClient.projectView
export const projectNotifyModel = pmClient.projectSettingNotification
export const taskStatusModel = pmClient.taskStatus
export const taskPointModel = pmClient.taskPoint
export const taskChecklistModel = pmClient.taskChecklist
export const tagModel = pmClient.tag
export const favModel = pmClient.favorites
export const taskModel = pmClient.task
export const memberModel = pmClient.members
export const userModel = pmClient.user
export const orgModel = pmClient.organization
export const orgStorage = pmClient.organizationStorage
export const orgMemberModel = pmClient.organizationMembers
export const dboardModel = pmClient.dashboard
export const dboardComponentModal = pmClient.dashboardComponent
export const taskAutomation = pmClient.taskAutomation
export const fileStorageModel = pmClient.fileStorage
export const visionModel = pmClient.vision
export const activityModel = pmClient.activity
export const commentModel = pmClient.comment

