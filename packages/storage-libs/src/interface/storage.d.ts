import { Storage } from '@prisma/client'

export interface IConfigS3 {
  bucket: string
  accessKeyId: string
  secretAccessKey: string
  region: string
  domain: string
}

export interface IS3Storage extends Storage {
  type: 'AWS_S3'
  config: IConfigS3
}

export type StorageData = IS3Storage
