import {PrismaClient} from "@prisma/client";

export const pmClient = new PrismaClient()
export const projectModel = pmClient.project
export const memberModel = pmClient.members

