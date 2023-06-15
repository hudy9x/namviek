import { Schema, z } from "zod";
import { Project } from "@prisma/client";

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

interface ParseResult {
	data: object | null;
	error: object | null;
	errorArr: Record<string, string>
}

function safeParse(schema: Schema, inputData: object): ParseResult {
	let data = null, error = null;
	const errorArr: Record<string, string> = {}

	try {
		const result = schema.parse(inputData);
		data = result;
	} catch (e) {
		error = e

		const issues = (error as any).issues
		issues.forEach((iss: { path: string[], message: string }) => {
			errorArr[iss.path[0]] = iss.message
		})
	}

	return { data, error, errorArr }
}


export const validateQuickAddProject = (data: Partial<Project>) => {
	return safeParse(quickAddPrjSchema, data)
}
