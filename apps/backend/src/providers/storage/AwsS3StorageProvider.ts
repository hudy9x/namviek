import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
import { IStorageProvider } from './IStorageProvider'

interface IConfig {
  region: string,
  accessKey: string,
  secretKey: string
}

const clientMapper = new Map<string, {
  client: S3Client
  config: IConfig
}>()

const minioEndpoint = process.env.AWS_MINIO_ENDPOINT

interface AwsS3Config {
  region: string
  bucketName: string
  accessKey: string
  secretKey: string
  orgId: string
  endpoint?: string
  forcePathStyle?: boolean
}

export default class AwsS3StorageProvider implements IStorageProvider {
  protected client: S3Client
  protected bucket: string
  protected region: string

  protected orgId: string
  protected config: IConfig = {
    region: '',
    accessKey: '',
    secretKey: ''
  }

  constructor(config: AwsS3Config) {
    this.bucket = config.bucketName
    this.region = config.region
    this.orgId = config.orgId

    this.config = {
      region: config.region,
      secretKey: config.secretKey,
      accessKey: config.accessKey
    }

    if (clientMapper.has(this.orgId)) {
      const cachedClient = clientMapper.get(this.orgId)
      const config = cachedClient.config

      if (this.isConfigChanged(config)) {
        console.log('s3 storage changes')
        this.createClient()
      } else {
        this.client = cachedClient.client
        console.log('s3 storage does not change')
      }

    } else {
      this.createClient()
    }
  }

  protected isConfigChanged(oldConfig: IConfig) {
    const newConfig = this.config

    return newConfig.region !== oldConfig.region || newConfig.accessKey !== oldConfig.accessKey || newConfig.secretKey !== oldConfig.secretKey
  }

  protected createClient() {
    const { region, accessKey, secretKey } = this.config
    const orgId = this.orgId

    let s3Config = {
      region: region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
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

    console.log('S3 configuration')
    console.log('minio', minioEndpoint)
    console.log(JSON.stringify(s3Config, null, ' '))

    this.client = new S3Client(s3Config)

    clientMapper.set(orgId, {
      client: this.client,
      config: {
        region,
        secretKey,
        accessKey
      }
    })

  }

  randomObjectKeyName(name: string) {
    const splitName = name.split('.')
    const sliceName = splitName.slice(0, -1)

    sliceName.push(randomUUID())

    name = `${sliceName.join('-')}.${splitName[splitName.length - 1]}`
    return name
  }

  createPresignedUrlWithClient = (name: string, type: string) => {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: name,
      ContentType: type
    })
    return getSignedUrl(this.client, command, { expiresIn: 3600 })
  }

  async getObjectURL(name: string): Promise<string> {
    if (minioEndpoint) {
      return `${minioEndpoint}/${this.bucket}/${name}`
    }

    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${name}`
  }

  async getObject(name: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: name
    })

    try {
      const response = await this.client.send(command)
      const str = await response.Body.transformToString()
      return str
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async deleteObject(name: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: name
    })

    try {
      const response = await this.client.send(command)
      return response.DeleteMarker
    } catch (error) {
      console.log('delete oobject s3 error', error)
      return null
    }
  }

}
