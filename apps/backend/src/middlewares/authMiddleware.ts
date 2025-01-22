import { NextFunction, Response } from 'express';
import { decodeToken, extractToken, generateRefreshToken, generateToken, verifyRefreshToken } from '../lib/jwt';
import { AuthRequest, JWTPayload, JWTType } from '../types';
import { pmClient } from 'packages/database/src/lib/_prisma';

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  const refreshToken = headers.refreshtoken as string;
  const clientId = headers['x-client-id'] as string;
  const clientSecret = headers['x-client-secret'] as string;

  if (clientId && clientSecret) {
    console.log('app authentication ', clientId, clientSecret)
    const application = await pmClient.application.findFirst({
      where: {
        clientId,
        clientSecret,
      }
    })

    if (!application) {
      console.log('Application is INACTIVE or doesnt exist')
      return res.status(401).end();
    }

    req.authen = {
      id: application.id,
      email: application.name,
      name: application.name,
      type: JWTType.APP,
      photo: ''
    }

    return next();
  }

  try {
    const validToken = extractToken(authorization);
    if (validToken) {
      // console.log('token is valid');
      const { id, email, name, photo } = validToken as JWTPayload;
      req.authen = { id, email, name, photo, type: JWTType.USER };
      // make sure that all tokens cleared
      res.setHeader('Authorization', '');
      res.setHeader('RefreshToken', '');
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

      req.authen = { ...user, type: JWTType.USER };
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
