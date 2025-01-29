import StorageConfigurationNotFoundException from "../exceptions/StorageConfigurationNotFoundException"
import OrganizationStorageService, { IStorageAWSConfig } from "./organizationStorage.service"
import AwsS3StorageProvider from "../providers/storage/AwsS3StorageProvider"
import { mdOrgGetOne, mdStorageGetOne, mdTaskGetOne, mdTaskUpdate } from "@database"
import StorageCache from "../caches/StorageCache"
import IncorrectConfigurationException from "../exceptions/IncorrectConfigurationException"
import { fileStorageModel } from "packages/database/src/lib/_prisma"
import { findNDelCaches } from "../lib/redis"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { IStorageProvider } from '../providers/storage/IStorageProvider';
import DigitalOceanStorageProvider from '../providers/storage/DigitalOceanStorageProvider';
import { OrgStorageType } from "@prisma/client"
import { HeadBucketCommand } from "@aws-sdk/client-s3"

export const MB = 1024 * 1024
export const GB = 1024 * MB
export const MAX_STORAGE_SIZE = 10 * GB // 10Gb

const minioEndpoint = process.env.AWS_MINIO_ENDPOINT

export class StorageService {
  protected orgId: string
  private storageProvider: IStorageProvider

  constructor(orgId: string) {
    this.orgId = orgId
  }

  protected async getStorageConfig() {
    const orgStorageService = new OrganizationStorageService(this.orgId)
    const storage = await orgStorageService.getConfig()

    console.log('get storage config', storage)

    if (!storage) {
      throw new StorageConfigurationNotFoundException()
    }

    return storage
  }

  protected async initStorageProvider(): Promise<IStorageProvider> {
    if (this.storageProvider) {
      return this.storageProvider
    }

    const storage = await this.getStorageConfig()
    const config = storage.config

    console.log('storage type', storage.type)

    switch (storage.type) {
      case OrgStorageType.DIGITAL_OCEAN_S3:
        this.storageProvider = new DigitalOceanStorageProvider({
          region: config.region,
          accessKey: config.accessKey,
          secretKey: config.secretKey,
          bucketName: config.bucketName,
          orgId: this.orgId
        })
        break

      case OrgStorageType.AWS_S3:
        if (minioEndpoint) {
          // Minio configuration
          this.storageProvider = new AwsS3StorageProvider({
            orgId: this.orgId,
            ...config,
            endpoint: minioEndpoint,
            forcePathStyle: true
          })
        } else {
          // Standard AWS S3 configuration
          this.storageProvider = new AwsS3StorageProvider({
            orgId: this.orgId,
            ...config
          })
        }
        break

      default:
        throw new Error(`Unsupported storage type: ${storage.type}`)
    }

    return this.storageProvider
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
    const provider = await this.initStorageProvider()
    await provider.deleteObject(name)

    await findNDelCaches(key)

    // decrease storage size
    const file = await mdStorageGetOne(fileId)
    if (file && file.size) {
      storageCache.decrSize(file.size)
    }
  }

  async validateConfig({ type, config }: {
    type: OrgStorageType,
    config: {
      bucketName: string,
      region: string,
      secretKey: string,
      accessKey: string,
      endpoint?: string
    }
  }): Promise<boolean> {
    try {
      if (type === OrgStorageType.AWS_S3) {
        return await this.validateAwsConfig(config)
      } else if (type === OrgStorageType.DIGITAL_OCEAN_S3) {
        return await this.validateDigitalOceanConfig(config)
      }
      return false
    } catch (error) {
      console.error('Storage validation error:', error)
      return false
    }
  }

  private async validateAwsConfig(config: {
    bucketName: string,
    region: string,
    secretKey: string,
    accessKey: string,
    endpoint?: string
  }): Promise<boolean> {
    let s3Config = {
      region: config.region,
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey
      }
    }

    if (minioEndpoint) {
      s3Config = {
        ...s3Config,
        ...{
          endpoint: minioEndpoint,
          forcePathStyle: true
        }
      }
    }

    const client = new S3Client(s3Config);

    const command = new PutObjectCommand({
      Bucket: config.bucketName,
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

  private async validateDigitalOceanConfig(config: {
    bucketName: string,
    region: string,
    secretKey: string,
    accessKey: string,
    endpoint?: string
  }): Promise<boolean> {
    try {
      const s3 = new S3Client({
        credentials: {
          accessKeyId: config.accessKey,
          secretAccessKey: config.secretKey,
        },
        // https://docs.digitalocean.com/products/spaces/how-to/use-aws-sdks/#configure-a-client
        endpoint: `https://${config.region}.digitaloceanspaces.com`,
        region: 'us-east-1',
        forcePathStyle: false,
      })

      await s3.send(new PutObjectCommand({
        Bucket: config.bucketName,
        Key: "test-connection.txt",
        Body: "Testing Digital Ocean Spaces connection",
      }));

      return true
    } catch (error) {
      console.error('Digital Ocean validation error:', error)
      return false
    }
  }

  async createPresignedUrl({ path, type, name }: { path: string, name: string, type: string }) {
    path = [this.orgId, path].filter(Boolean).join('/')
    const provider = await this.initStorageProvider()
    console.log('provider', provider)
    const randName = `${path}/` + provider.randomObjectKeyName(name)

    try {
      const presignedUrl = await provider.createPresignedUrlWithClient(randName, type)
      return {
        randName,
        presignedUrl,
        url: await provider.getObjectURL(randName)
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

  public async getObjectUrl(keyName: string): Promise<string> {
    const provider = await this.initStorageProvider()
    return provider.getObjectURL(keyName)
  }
}
