import { Router } from 'express'
import { AuthRequest } from '../../types'
import {
  mdMemberGetAllByProjectId,
  mdOrgMemberAdd,
  mdOrgMemberExist,
  mdOrgMemberGet,
  mdOrgMemberSeach,
  mdUserFindEmail
} from '@shared/models'
import { InvitationStatus, OrganizationRole } from '@prisma/client'

const router = Router()

router.get('/org/members/:orgId', (req: AuthRequest, res) => {
  const { projectId } = req.query as { projectId: string }
  const { orgId } = req.params as { orgId: string }
  console.log('/org/members', projectId, orgId)
  mdOrgMemberGet(orgId)
    .then(result => {
      const users = result.map(r => {
        const user = r.users
        user.password = ''
        return user
      })
      res.json({ status: 200, data: users })
    })
    .catch(error => {
      console.log('err', error)
      res.json({ status: 500, error })
    })
})

router.post('/org/member/invite', async (req: AuthRequest, res) => {
  const { id: uid } = req.authen
  const { orgId, email } = req.body as {
    orgId: string
    email: string
  }

  try {
    const foundUser = await mdUserFindEmail(email)
    if (!foundUser) {
      return res.status(400).json({ error: 'EMAIL_NOT_FOUND' })
    }

    const isAlreadyExist = await mdOrgMemberExist({
      orgId,
      uid: foundUser.id
    })

    if (isAlreadyExist) return res.status(400).json({ error: 'ALREADY_EXIST' })

    console.log('founded', foundUser)

    await mdOrgMemberAdd({
      organizationId: orgId,
      uid: foundUser.id,
      status: InvitationStatus.ACCEPTED,
      role: OrganizationRole.MEMBER,
      createdAt: new Date(),
      createdBy: uid,
      updatedAt: null,
      updatedBy: null
    })

    res.status(200).json({ data: foundUser })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/org/member/search', async (req: AuthRequest, res) => {
  const { projectId, orgId, term } = req.body as {
    projectId: string
    orgId: string
    term: string
  }

  console.log('search query', projectId, orgId, term)

  try {
    console.time('old-members')
    const existingMembers = await mdMemberGetAllByProjectId(projectId)
    console.timeEnd('old-members')

    const existingMemIds = existingMembers.map(m => m.uid)
    console.log('existing memids', existingMemIds)

    console.time('search-member')
    mdOrgMemberSeach({
      orgId,
      term,
      notUids: existingMemIds
    })
      .then(data => {
        console.log('success')
        console.log(data)
        console.timeEnd('search-member')
        res.json({ status: 200, data })
      })
      .catch(error => {
        console.log(error)
        console.timeEnd('search-member')
        res.json({ status: 500, error })
      })
  } catch (error) {
    console.log(error)
    res.json({ status: 500, error })
  }
})

export default router
