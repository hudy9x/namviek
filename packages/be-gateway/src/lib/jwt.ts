import { sign, verify, decode } from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const REFRESH_KEY = process.env.JWT_REFRESH_KEY;
const TOKEN_EXPIRED = process.env.JWT_TOKEN_EXPIRED;
const REFRESH_EXPIRED = process.env.JWT_REFRESH_EXPIRED;

export const decodeToken = (token: string) => {
  return decode(token);
};

export const generateToken = (payload: object) => {
  console.log('TOKEN_EXPIRED', TOKEN_EXPIRED, typeof TOKEN_EXPIRED)
  return sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRED });
};

export const generateRefreshToken = (payload: object) => {
  console.log('REFRESH_EXPIRED', REFRESH_EXPIRED, typeof REFRESH_EXPIRED)
  return sign(payload, REFRESH_KEY, { expiresIn: REFRESH_EXPIRED });
};

export const extractToken = (token: string) => {
  return verify(token, SECRET_KEY);
};

export const verifyToken = (token: string): Promise<boolean> => {
  return new Promise(resolve => {
    try {
      verify(token, SECRET_KEY);
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  });
};

export const verifyRefreshToken = (token: string): Promise<boolean> => {
  return new Promise(resolve => {
    try {
      verify(token, REFRESH_KEY);
      resolve(true);
    } catch (error) {
      console.log('verify refresh token eror', error);
      resolve(false);
    }
  });
};
