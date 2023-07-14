import { Router } from 'express'
import { AuthRequest } from '../../types'
import { mdOrgMemberGet } from '@shared/models'

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

router.post('/org/member/search', (req: AuthRequest, res) => {
  const { projectId, orgId, term } = req.body as {
    projectId: string
    orgId: string
    term: string
  }

  res.json({ status: 200 })
})

export default router
