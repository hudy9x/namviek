import { StorageAws } from "@be/storage"
import StorageConfigurationNotFoundException from "../exceptions/StorageConfigurationNotFoundException"
import OrganizationStorageService from "./organizationStorage.service"
import AwsS3StorageProvider from "../providers/storage/AwsS3StorageProvider"
import { mdOrgGetOne, mdProjectGetOrgId } from "@shared/models"
import StorageCache from "../caches/StorageCache"
import MaxStorageSizeException from "../exceptions/MaxStorageSizeException"
import IncorrectConfigurationException from "../exceptions/IncorrectConfigurationException"

export const MAX_STORAGE_SIZE = 100 * 1024 * 1024 // 100Mb
export class StorageService {
  protected orgId: string
  constructor(orgId: string) {
    this.orgId = orgId
  }

  protected async getStorageConfig() {
    const orgStorageService = new OrganizationStorageService(this.orgId)
    const awsConfig = await orgStorageService.getConfig()

    if (!awsConfig) {
      throw new StorageConfigurationNotFoundException()
    }

    return awsConfig

  }

  protected async initS3Client() {
    const awsConfig = await this.getStorageConfig()
    const s3Store = new AwsS3StorageProvider({ orgId: this.orgId, ...awsConfig })

    return s3Store
  }

  async deleteFile(name: string) {
    const s3Store = await this.initS3Client()
    await s3Store.deleteObject(name)
  }


  async createPresignedUrl({ projectId, type, name }: { projectId: string, name: string, type: string }) {

    const s3Store = await this.initS3Client()
    const randName = `${this.orgId}/${projectId}/` + s3Store.randomObjectKeyName(name)

    try {
      const presignedUrl = await s3Store.createPresignedUrlWithClient(randName, type)
      return {
        randName,
        presignedUrl
      }
    } catch (error) {
      console.log(error)
      throw new IncorrectConfigurationException()
    }

  }

  async exceedMaxStorageSize() {
    const organizationId = this.orgId
    const storageCache = new StorageCache(organizationId)
    const totalSize = await storageCache.getTotalSize()
    const { maxStorageSize } = await mdOrgGetOne(organizationId)

    if (maxStorageSize && totalSize > maxStorageSize) {
      return true
    }

    if (!isNaN(totalSize) && totalSize > MAX_STORAGE_SIZE) {
      return true
    }

    return false
  }
}
