import { DiscordWebhook } from "@prisma/client";
import { z } from "zod";
import { safeParse } from "./lib";

const discordWebhook = z.object({
  url: z.string().min(1, { message: "Discord webhook url is required" }),
  botName: z.string(),
  botIcon: z.string(),
  enable: z.boolean(),

}).partial()

const discordWebhookSchema = discordWebhook.required({
  url: true
})

export const validateDiscordWebhook = (data: Partial<DiscordWebhook>) => {
  return safeParse(discordWebhookSchema, data)
}
