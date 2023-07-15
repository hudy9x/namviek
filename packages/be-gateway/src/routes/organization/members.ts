import { Router } from 'express'
import { AuthRequest } from '../../types'
import { mdOrgMemberGet, mdOrgMemberSeach } from '@shared/models'

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

  console.log('search query', projectId, orgId, term)

  mdOrgMemberSeach({
    orgId,
    term
  }).then(data => {
    console.log('success')
    console.log(data)
    res.json({ status: 200, data })
  }).catch(error => {
    console.log(error)
    res.json({ status: 500, error })
  })


})

export default router
