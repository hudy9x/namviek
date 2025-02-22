import { PrismaClient } from '@prisma/client'

export const pmClient = new PrismaClient()
export const pmTrans = pmClient.$transaction

export const projectModel = pmClient.project
export const projectViewModel = pmClient.projectView
export const favModel = pmClient.favorites
export const gridModel = pmClient.grid
export const memberModel = pmClient.members
export const userModel = pmClient.user
export const orgModel = pmClient.organization
export const orgStorage = pmClient.organizationStorage
export const orgMemberModel = pmClient.organizationMembers
export const fileStorageModel = pmClient.fileStorage
export const fieldModel = pmClient.field
export const gridCollectionModel = pmClient.gridCollection
export const gridWebhookModel = pmClient.gridWebhook

