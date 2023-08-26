import { NextFunction, Response } from 'express'
import { mdMemberBelongToProject } from '@shared/models'
import { AuthRequest } from '../types'

export const beProjectMemberMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.authen
  const { body, query, params } = req
  const projectId = query.projectId || body.projectId || params.projectId

  if (!projectId) {
    return res.json({
      status: 400,
      error: `You must provide 'projectId' in request: ${req.url}`
    })
  }

  if (projectId === 'all') {
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
