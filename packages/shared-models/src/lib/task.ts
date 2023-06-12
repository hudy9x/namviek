
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const addTask = async () => {

	await prisma.project.create({data: {
		title: "Printgrows",
		desc: "",
		createdAt: new Date(),
		createdBy: "userId",
		organizationId: "organization id"
	}})
	
	
	return 1
}
