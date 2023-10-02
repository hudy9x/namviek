import { Router } from 'express'
import {
  createPresignedUrlWithClient,
  deleteObject,
  getObject,
  getObjectURL,
  randomObjectKeyName
} from './lib/storage'
const router = Router()

router.post('/create-presigned-url', async (req, res, next) => {
  const { name, type } = req.body as { name: string; type: string }

  const randName = 'kampuni-project/' + randomObjectKeyName(name)
  const presignedUrl = await createPresignedUrlWithClient(randName, type)

  res.status(200).json({
    data: {
      name: randName,
      presignedUrl,
      url: getObjectURL(randName)
    }
  })
})

router.get('/get-object-url', async (req, res, next) => {
  try {
    const { name } = req.query as { name: string }
    const url = await getObject(name)
    res.json({ data: url })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/delete-obeject', async (req, res, next) => {
  try {
    const { name } = req.query as { name: string }
    const result = await deleteObject(name)
    res.json({
      status: 200,
      data: result
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

export const storageRouter = router
