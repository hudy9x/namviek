import { DiscordNotification } from "@prisma/client";
import { z } from "zod";
import { safeParse } from "./lib";

const discordNotification = z.object({
  discordWebhookUrl: z.string().min(1, { message: "Discord webhook url is required" }),
  discordWebhookName: z.string(),
  discordWebhookIcon: z.string(),
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
