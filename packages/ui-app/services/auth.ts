import { httpPost } from "./_req"
import { User } from "@prisma/client"


export const signup = (data: Partial<User>) => {
	return httpPost('/api/auth/sign-up', data)
}

export interface ISignin {
	email: string
	password: string
}

export const signin = ({ email, password }: ISignin) => {
	return httpPost('/api/auth/sign-in', { email, password })
}

