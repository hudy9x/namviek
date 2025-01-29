import { z } from "zod"
import { safeParse } from "./_utils"

const email = z.object({
  email: z.string().email("Invalid email address")
}).required()

export const validateEmail = (data: { email: string }) => {
  return safeParse(email, data)
} 