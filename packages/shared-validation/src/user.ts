
import { z } from "zod";
import { User } from "@prisma/client";
import { safeParse } from "./lib";

const user = z.object({
	email: z.string().email(),
	password: z.string().min(4).max(100),
	name: z.string().min(2).max(30),
	country: z.string(),
	bio: z.string(),
	dob: z.date(),

	createdBy: z.string(),
	createdAt: z.date(),
	updatedBy: z.string(),
	updatedAt: z.date()
}).partial()

const registerUserSchema = user.required({
	email: true,
	name: true,
	password: true
})

const loginUserSchema = user.required({
	email: true,
	password: true
})

export const validateRegisterUser = (data: Partial<User>) => {
	return safeParse(registerUserSchema, data)
}

export const validateLoginUser = (data: Partial<User>) => {
	return safeParse(loginUserSchema, data)
}
