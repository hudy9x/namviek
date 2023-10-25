import { mdDiscordWebhookAdd, mdDiscordWebhookDelete, mdDiscordWebhookGetAll, mdDiscordWebhookGetOne } from '@shared/models';
import { Router } from 'express';
import { authMiddleware, beProjectMemberMiddleware } from '../../middlewares';
import { AuthRequest } from '../../types';
import { DiscordWebhook } from '@prisma/client';
import { pmClient } from 'packages/shared-models/src/lib/_prisma';

const router = Router()

router.use([authMiddleware, beProjectMemberMiddleware])

// It means GET:/api/example
router.get('/project/discord-webhooks', async (req: AuthRequest, res) => {
  const projectId = req.query.projectId as string | null;

  if (!projectId) {
    return res.status(404).json({ error: 'Project not found' })
  }

  try {
    const discordWebhooks = await mdDiscordWebhookGetAll(projectId)

    res.status(200).json({ data: discordWebhooks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }

})

router.get('/project/discord-webhooks/query', async (req: AuthRequest, res) => {
  const discordWebhookId = req.query.discordWebhookId as string;

  if (!discordWebhookId) {
    return res.status(404).json({ error: 'Discord webhook not found' })
  }

  try {
    const discordWebhook = await mdDiscordWebhookGetOne(discordWebhookId)

    res.status(200).json({ data: discordWebhook })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})


// It means POST:/api/example
router.post('/project/discord-webhooks', async (req: AuthRequest, res) => {
  try {
    const result = await mdDiscordWebhookAdd(req.body)
    console.log(req.body)
    res.json({ status: 200, data: result })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.put('/project/discord-webhook', async (req: AuthRequest, res) => {
  const {
    id,
    url,
    botName,
    botIcon,
    enabled,

  } = req.body as DiscordWebhook
  const { id: userId } = req.authen

  try {
    await pmClient.$transaction(async tx => {
      const discordWebhookData = await tx.discordWebhook.findFirst({
        where: {
          id: id
        }
      })

      if (url) {
        discordWebhookData.url = url
      }

      if (botName) {
        discordWebhookData.botName = botName
      }

      if (botIcon) {
        discordWebhookData.botIcon = url
      }

      if (enabled) {
        discordWebhookData.enabled = enabled
      }

      discordWebhookData.updatedAt = new Date()
      discordWebhookData.updatedBy = userId

      delete discordWebhookData.id

      const result = await tx.discordWebhook.update({
        where: {
          id
        },
        data: discordWebhookData
      })

      res.status(200).json({ data: result })
    })

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

router.delete('/project/discord-webhooks/query', async (req: AuthRequest, res) => {
  const discordWebhookId = req.query.discordWebhookId as string;

  if (!discordWebhookId) {
    return res.status(404).json({ error: 'Discord webhook not found' })
  }

  try {
    const discordWebhook = await mdDiscordWebhookDelete(discordWebhookId)

    res.status(200).json({ data: discordWebhook })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})


export default router
