import { NextFunction, Request, Response } from 'express';
import { extractToken, generateRefreshToken, generateToken, verifyRefreshToken, verifyToken } from '../lib/jwt';
import { mdUserFindEmail } from '@shared/models';
import { User } from '@prisma/client';
import { AuthRequest, JWTPayload } from '../types';

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
	const headers = req.headers;
	const authorization = headers.authorization;
	const refreshToken = headers.refreshtoken as string;

	try {
		const validToken = extractToken(authorization);
		if (validToken) {
			const { id, email, name, photo, ...rest } = validToken as JWTPayload;
			req.authen = { id, email, name, photo };
			return next();
		}

		const validRefreshToken = await verifyRefreshToken(refreshToken);
		if (validRefreshToken) {
			const user = validToken as JWTPayload;
			const token = generateToken({
				id: user.id,
				email: user.email,
				name: user.name,
				photo: user.photo
			});

			const refreshToken = generateRefreshToken({
				email: user.email
			});

			res.setHeader('Authorization', token);
			res.setHeader('RefreshToken', refreshToken);

			req.authen = user;
		}

		return next();
	} catch (error) {
		console.log('authMiddlware:', error);
		return res.status(440).end();
	}

	// next()
};
