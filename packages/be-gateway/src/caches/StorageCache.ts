import { CKEY, decrByCache, getCache, incrByCache } from "../lib/redis";

export default class StorageCache {
  key: string[]
  constructor(orgId: string) {
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
}
