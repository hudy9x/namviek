import { Router } from 'express'
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import {
  mdMemberAddMany,
  mdMemberDel,
  mdMemberGetAllByProjectId,
  mdMemberUpdateRole
} from '@shared/models'
import { MemberRole, User } from '@prisma/client'
import {
  CKEY,
  delCache,
  delMultiCache,
  getJSONCache,
  setJSONCache
} from '../../lib/redis'
import { pusherTrigger } from '../../lib/pusher-server'

const router = Router()

router.use([authMiddleware, beProjectMemberMiddleware])

// It means GET:/api/project
router.get('/project/member', async (req: AuthRequest, res) => {
  const { projectId } = req.query as { projectId: string }
  const key = [CKEY.PROJECT_MEMBER, projectId]

  try {
    const cached = await getJSONCache(key)
    if (cached) {
      return res.json({
        status: 200,
        data: cached
      })
    }

    const members = await mdMemberGetAllByProjectId(projectId)
    const users = members.map(m => ({ ...m.users, role: m.role }))

    setJSONCache(key, users)

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
  const key = [CKEY.PROJECT_MEMBER, projectId]
  const userProjectKeys = []

  const userProjectUpdateKeys: string[] = []
  mdMemberAddMany(
    members.map(m => {
      userProjectKeys.push([CKEY.USER_PROJECT, m.id])

      if (userId !== m.id) {
        userProjectUpdateKeys.push(`userProject:update.${m.id}`)
      }

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
      // delCache(key)
      userProjectKeys.push(key)
      delMultiCache(userProjectKeys)

      userProjectUpdateKeys.forEach(k => {
        pusherTrigger('team-collab', k, {
          triggerBy: userId
        })
      })

      // add new user to other members in same project
      pusherTrigger(
        'team-collab',
        `userProject.sync-to-project-${projectId}`,
        {
          triggerBy: userId
        }
      )

      res.json({ status: 200, data: result })
    })
    .catch(error => {
      res.json({ status: 500, error })
    })
})

router.put('/project/member/role', async (req: AuthRequest, res) => {
  const { uid, role, projectId } = req.body as {
    uid: string
    role: MemberRole
    projectId: string
  }
  const key = [CKEY.PROJECT_MEMBER, projectId]

  console.log('uid', uid)
  console.log('projectId', projectId)
  console.log('role', role)

  mdMemberUpdateRole({
    uid,
    projectId,
    role
  })
    .then(result => {
      delCache(key)
      res.json({ status: 200, data: result })
    })
    .catch(error => {
      res.json({ status: 500, error })
    })
})

router.delete('/project/member', async (req: AuthRequest, res) => {
  const { id: userId } = req.authen
  const { uid, projectId } = req.query as { uid: string; projectId: string }
  const key = [CKEY.PROJECT_MEMBER, projectId]
  const userProjectKey = [CKEY.USER_PROJECT, uid]

  mdMemberDel(uid, projectId)
    .then(result => {
      // delCache(key)
      delMultiCache([key, userProjectKey])
      pusherTrigger(
        'team-collab',
        `userProject.sync-to-project-${projectId}`,
        {
          triggerBy: userId
        }
      )
      res.json({ status: 200, data: result })
    })
    .catch(error => {
      res.json({ status: 500, error })
    })
})

export default router
