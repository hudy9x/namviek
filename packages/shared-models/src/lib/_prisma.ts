import { PrismaClient } from "@prisma/client";

export const pmClient = new PrismaClient()
export const dbTransaction = pmClient.$transaction
export const projectModel = pmClient.project
export const taskModel = pmClient.task
export const memberModel = pmClient.members
export const userModel = pmClient.user
export const orgModel = pmClient.organization
export const orgMemberModel = pmClient.organizationMembers

