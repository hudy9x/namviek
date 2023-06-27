import { sign, verify } from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET_KEY

export const generateToken = (payload: object) => {
	return sign(payload, SECRET_KEY, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload: object) => {
	return sign(payload, SECRET_KEY, { expiresIn: "30m" })
}

export const verifyToken = (token: string): Promise<boolean> => {
	return new Promise((resolve) => {
		try {
			verify(token, SECRET_KEY)
			resolve(true)
		} catch (error) {
			resolve(false)
		}
	})
}
