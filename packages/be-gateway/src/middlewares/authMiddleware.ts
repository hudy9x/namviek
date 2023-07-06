import { NextFunction, Response } from 'express';
import { decodeToken, extractToken, generateRefreshToken, generateToken, verifyRefreshToken, verifyToken } from '../lib/jwt';
import { mdUserFindEmail } from '@shared/models';
import { User } from '@prisma/client';
import { AuthRequest, JWTPayload } from '../types';

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  const refreshToken = headers.refreshtoken as string;
  console.log('refresh', refreshToken);

  try {
    const validToken = extractToken(authorization);
    if (validToken) {
      console.log('token is valid');
      const { id, email, name, photo, ...rest } = validToken as JWTPayload;
      req.authen = { id, email, name, photo };
      return next();
    }
  } catch (err) {
    console.log('token is INVALID');
  }

  console.log('trying to generate refresh token');

  try {
    const validRefreshToken = await verifyRefreshToken(refreshToken);
    console.log('valid', validRefreshToken);
    if (validRefreshToken) {
      console.log('token is invalid, but refresh token is valid');
      console.log('re-generate new token vs refresh token');
      const user = decodeToken(authorization) as JWTPayload;
      console.log('user infor', user);
      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        photo: user.photo
      });
      console.log('generated token');

      const refreshToken = generateRefreshToken({
        email: user.email
      });

      console.log('generated refresh token');

      res.setHeader('Authorization', token);
      res.setHeader('RefreshToken', refreshToken);

      console.log('genereated succesfully');

      req.authen = user;
      return next();
    }

    console.log('refresh token is INVALID as well');
    return res.status(440).end();
  } catch (error) {
    console.log('refresh token is INVALID as well');
    return res.status(440).end();
  }

  // next()
};
