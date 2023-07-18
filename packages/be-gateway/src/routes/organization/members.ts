import { Router } from 'express'
import { AuthRequest } from '../../types'
import {
  mdMemberGetAllByProjectId,
  mdOrgMemberGet,
  mdOrgMemberSeach
} from '@shared/models'

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
