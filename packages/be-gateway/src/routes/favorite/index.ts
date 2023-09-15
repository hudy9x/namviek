import { Router } from 'express'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import { mdFavAdd, mdFavDel, mdFavGet } from '@shared/models'
import { CKEY, delCache, getJSONCache, setJSONCache } from '../../lib/redis'

const router = Router()

router.use([authMiddleware])

// It means GET:/api/example
router.get('/favorite', async (req: AuthRequest, res) => {
  const { id: uid } = req.authen
  const { orgId } = req.query as { orgId: string }
  try {
    const key = [CKEY.FAV_QUERY, uid, orgId]
    const cache = await getJSONCache(key)

    if (cache) {
      return res.json({ status: 200, data: cache })
    }

    const results = await mdFavGet(uid, orgId)
    setJSONCache(key, results)

    res.json({ status: 200, data: results })
  } catch (error) {
    res.status(500).json({ error })
  }
})

// router.put('/favorite', async (req: AuthRequest, res) => {
//   const { id: uid } = req.authen
//   try {
//     const key = [CKEY.FAV_QUERY, uid]
//     await delCache(key)
//
//     res.status(200)
//   } catch (error) {
//     res.status(500)
//   }
// })

router.delete('/favorite', async (req: AuthRequest, res) => {
  const { id: uid } = req.authen
  const { id, orgId } = req.query as { id: string; orgId: string }
  const key = [CKEY.FAV_QUERY, uid, orgId]
  try {
    await mdFavDel(id, uid)
    await delCache(key)
    console.log('removed ', id)
    res.json({ status: 200 })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

// It means POST:/api/example
router.post('/favorite', async (req: AuthRequest, res) => {
  const { id: uid } = req.authen
  const { name, icon, link, type, orgId } = req.body as {
    orgId: string
    name: string
    icon: string
    link: string
    type: string
  }

  console.log(req.body)
  const key = [CKEY.FAV_QUERY, uid, orgId]

  try {
    const result = await mdFavAdd({
      name,
      orgId,
      icon,
      link,
      type,
      uid: uid,
      createdAt: new Date(),
      createdBy: uid,
      updatedAt: null,
      updatedBy: null
    })
    await delCache(key)
    res.json({ status: 200, data: result })
  } catch (error) {
    console.log('create favorite error', error)
    res.status(500).json({ error })
  }
})

export default router
