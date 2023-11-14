import { NextFunction, Request, Response } from 'express'

export * from './authMiddleware'
export * from './beProjectMemberMiddleware'

export const testMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('next herer')
  next()
}

export const test2Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('next herer 2')
  next()
}
