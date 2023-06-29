import { Organization } from "@prisma/client"
import { httpPost } from "./_req"

export const orgCreate = (data: Partial<Organization>) => {
  return httpPost('/api/auth/org', data)
}
