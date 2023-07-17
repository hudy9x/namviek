import { Router } from 'express'
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdMemberAdd,
  mdMemberAddMany,
  mdMemberGetAllByProjectId,
  mdMemberGetProject,
  mdProjectAdd,
  mdProjectGetAllByIds
} from '@shared/models'
import { MemberRole, User } from '@prisma/client'
import { orgMemberModel } from 'packages/shared-models/src/lib/_prisma'

const router = Router()

router.use([authMiddleware, beProjectMemberMiddleware])

// It means GET:/api/project
router.get('/project/member', async (req: AuthRequest, res) => {
  const { id: userId } = req.authen
  const query = req.query

  try {
    const members = await mdMemberGetAllByProjectId(query.projectId as string)
    const users = members.map(m => ({ ...m.users, role: m.role }))

    res.json({
      status: 200,
      data: users
    })
  } catch (error) {
    console.log('get project member error', error)
    res.json({
      status: 500,
      err: error,
      data: []
    })
  }
})

// It means POST:/api/project
router.post('/project/member', async (req: AuthRequest, res) => {
  const { id: userId } = req.authen
  const { projectId, members } = req.body as {
    projectId: string
    members: User[]
  }

  console.log('projectId + members:', projectId, members)

  mdMemberAddMany(
    members.map(m => {
      return {
        projectId,
        role: MemberRole.MEMBER,
        uid: m.id,
        createdBy: userId,
        createdAt: new Date(),
        updatedBy: null,
        updatedAt: null
      }
    })
  )
    .then(result => {
      console.log('done')
      res.json({ status: 200, data: result })
    })
    .catch(error => {
      res.json({ status: 500, error })
    })
})

router.delete('/project/member', async (req: AuthRequest, res) => {
  const params = req.params
  console.log('parmas', req.params)
  console.log('query', req.query)

  res.json({
    status: 200
  })
})

export default router
