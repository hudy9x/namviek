import { User } from "@prisma/client";
import { Request } from "express";

export type JWTPayload = Pick<User, 'id' | 'name' | 'photo' | 'email'>

export interface AuthRequest extends Request {
  authen: JWTPayload
}

export interface MulterRequest extends Request {
  file: Express.Multer.File;
}