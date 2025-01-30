import { z } from "zod"
import { safeParse } from "./_utils"

export const emailSchema = z.string().email("Invalid email address")

export type EmailSchema = z.infer<typeof emailSchema>

export const validateEmail = (data: string) => {
  return safeParse(emailSchema, { value: data })
} 