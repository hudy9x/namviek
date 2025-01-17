import { NextFunction, Response } from 'express'
import { mdMemberBelongToProject } from '@database'
import { AuthRequest, JWTType } from '../types'

export const beProjectMemberMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id, type } = req.authen
  const { body, query, params } = req
  const projectId = query.projectId || body.projectId || params.projectId
  const projectIds = query.projectIds as string[]

  if (!projectId && projectIds && !projectIds.length) {
    return res.json({
      status: 400,
      error: `You must provide 'projectId' in request: ${req.url}`
    })
  }

  if (projectId === 'all' || (projectIds && projectIds.includes('ALL'))) {
    next()
    return
  }

  if (type === JWTType.APP) {
    next()
    return
  }

  const result = await mdMemberBelongToProject(id, projectId)

  if (!result) {
    return res.json({
      status: 400,
      error: `You are not member of project ${projectId}`
    })
  }

  next()
}
