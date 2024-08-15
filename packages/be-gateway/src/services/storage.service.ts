import StorageConfigurationNotFoundException from "../exceptions/StorageConfigurationNotFoundException"
import OrganizationStorageService, { IStorageAWSConfig } from "./organizationStorage.service"
import AwsS3StorageProvider from "../providers/storage/AwsS3StorageProvider"
import { mdOrgGetOne, mdStorageGetOne, mdTaskGetOne, mdTaskUpdate } from "@shared/models"
import StorageCache from "../caches/StorageCache"
import IncorrectConfigurationException from "../exceptions/IncorrectConfigurationException"
import { fileStorageModel } from "packages/shared-models/src/lib/_prisma"
import { findNDelCaches } from "../lib/redis"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

export const MB = 1024 * 1024
export const GB = 1024 * MB
export const MAX_STORAGE_SIZE = 10 * GB // 10Gb

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

  protected getObjectUrl() {
    return ''
  }

  protected async initS3Client() {
    const awsConfig = await this.getStorageConfig()
    const s3Store = new AwsS3StorageProvider({ orgId: this.orgId, ...awsConfig })

    return s3Store
  }

  async removeFileFromOwner(owner: string, fileId: string) {

    const task = await mdTaskGetOne(owner)

    const { fileIds } = task

    if (!fileIds.includes(fileId)) {
      // return 'FILE_NOT_EXIST_IN_TASK'
      throw new Error('FILE_NOT_EXIST_IN_TASK')
    }

    task.fileIds = fileIds.filter(f => f !== fileId)

    delete task.id

    const promises = []
    promises.push(
      fileStorageModel.delete({
        where: { id: fileId }
      })
    )

    promises.push(
      mdTaskUpdate({
        id: owner,
        ...task
      })
    )

    await Promise.all(promises)

  }

  async removeFileFromStorage(name: string, key: string[], fileId: string) {

    const storageCache = new StorageCache(this.orgId)
    const s3Store = await this.initS3Client()
    await s3Store.deleteObject(name)

    await findNDelCaches(key)

    // decrease storage size
    const file = await mdStorageGetOne(fileId)
    if (file && file.size) {
      storageCache.decrSize(file.size)
    }
  }

  async validateAwsConfig(awsConfig: Omit<IStorageAWSConfig, 'maxStorageSize'>) {

    const client = new S3Client({

      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKey,
        secretAccessKey: awsConfig.secretKey
      }
    });


    const command = new PutObjectCommand({
      Bucket: awsConfig.bucketName,
      Key: "hello-s3.txt",
      Body: "Hello S3!",
    });

    try {
      const response = await client.send(command);
      console.log(response);
      return true
    } catch (err) {
      console.error(err);
      return false
    }

  }


  async createPresignedUrl({ projectId, type, name }: { projectId: string, name: string, type: string }) {

    const s3Store = await this.initS3Client()
    const randName = `${this.orgId}/${projectId}/` + s3Store.randomObjectKeyName(name)

    try {
      const presignedUrl = await s3Store.createPresignedUrlWithClient(randName, type)
      console.log('presignedUrl', presignedUrl)
      return {
        randName,
        presignedUrl,
        url: s3Store.getObjectURL(randName)
      }
    } catch (error) {
      console.log(error)
      throw new IncorrectConfigurationException()
    }

  }

  async exceedMaxStorageSize() {
    const orgId = this.orgId
    const storageCache = new StorageCache(orgId)
    const totalSize = await storageCache.getTotalSize()
    const maxStorageSize = await storageCache.getMaxStorageSize()
    // const { maxStorageSize } = await mdOrgGetOne(organizationId)

    //  unlimited storage size
    if (maxStorageSize === -1) {
      return true
    }

    if (maxStorageSize && totalSize > maxStorageSize) {
      return true
    }

    if (!isNaN(totalSize) && totalSize > MAX_STORAGE_SIZE) {
      return true
    }

    return false
  }
}
