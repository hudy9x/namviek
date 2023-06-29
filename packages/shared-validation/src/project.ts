import { z } from "zod";
import { Project } from "@prisma/client";
import { safeParse } from "./lib";

const project = z.object({
	name: z.string().min(3).max(50),
	desc: z.string().max(200),
	cover: z.string().url(),
	icon: z.string(),
	organizationId: z.string(),
	createdBy: z.string(),
	createdAt: z.date(),
	updatedBy: z.string(),
	updatedAt: z.date()
}).partial()

const quickAddPrjSchema = project.required({
	name: true,
})

export const validateQuickAddProject = (data: Partial<Project>) => {
	return safeParse(quickAddPrjSchema, data)
}
