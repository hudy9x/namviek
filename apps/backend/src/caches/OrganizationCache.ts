import { mdOrgGetOne } from "@shared/models"
import { CKEY, getCache, setCache } from "../lib/redis"

export default class OrganizationCache {
  orgId: string
  key: string[]
  constructor(orgId: string) {
    this.orgId = orgId
    this.key = [CKEY.ORG_MAX_STORAGE_SIZE, orgId]
  }

  async getMaxStorageSize() {
    const cached = await getCache(this.key)
    if (cached) {
      return cached
    }

    const { maxStorageSize } = await mdOrgGetOne(this.orgId)
    await setCache(this.key, maxStorageSize)

    return maxStorageSize
  }

}
