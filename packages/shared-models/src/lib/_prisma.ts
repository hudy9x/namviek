import { PrismaClient } from '@prisma/client'

export const pmClient = new PrismaClient()
export const projectModel = pmClient.project
export const taskStatusModel = pmClient.taskStatus
export const taskPointModel = pmClient.taskPoint
export const tagModel = pmClient.tag
export const favModel = pmClient.favorites
export const taskModel = pmClient.task
export const memberModel = pmClient.members
export const userModel = pmClient.user
export const orgModel = pmClient.organization
export const orgMemberModel = pmClient.organizationMembers
export const dboardModel = pmClient.dashboard
export const dboardComponentModal = pmClient.dashboardComponent
