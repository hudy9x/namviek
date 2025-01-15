import { mdOrgGetOne } from "@shared/models";
import { CKEY, decrByCache, getCache, incrByCache } from "../lib/redis";

const cachedStorage = new Map<string, number>()
export default class StorageCache {
  orgId: string
  key: string[]
  constructor(orgId: string) {
    this.orgId = orgId;
    this.key = [CKEY.ORG_STORAGE_SIZE, orgId]
  }

  async getTotalSize() {
    const size = await getCache(this.key)
    return parseInt(size, 10)
  }

  async incrSize(size: number) {
    return await incrByCache(this.key, size)
  }

  async decrSize(size: number) {
    return await decrByCache(this.key, size)
  }

  static deleteMaxStorageSize(orgId: string) {
    cachedStorage.delete(orgId)
  }

  async getMaxStorageSize(orgId_?: string) {
    const orgId = orgId_ || this.orgId
    if (cachedStorage.has(orgId)) {
      return cachedStorage.get(orgId)
    }

    const { maxStorageSize } = await mdOrgGetOne(orgId)

    if (maxStorageSize) {
      cachedStorage.set(orgId, maxStorageSize)
    }

    return maxStorageSize
  }
}
