import { z } from "zod";
import { DiscordNotification, Task } from "@prisma/client";
import { safeParse } from "./lib";

const discordNotification = z.object({
  discordWebhookUrl: z.string().min(3),
  discordWebhookName: z.string().min(3),
  discordWebhookIcon: z.string().min(3),
  enable: z.boolean(),

  createdBy: z.string(),
  createdAt: z.date(),
  updatedBy: z.string(),
  updatedAt: z.date()
}).partial()

const discordNotificationSchema = discordNotification.required({
  discordWebhookUrl: true
})

export const validateDiscordNotification = (data: Partial<DiscordNotification>) => {
  return safeParse(discordNotificationSchema, data)
}
