import { IS3Storage } from '../interface/storage'
import { S3 } from 'aws-sdk'

const expire = 1000000

export default class AwsS3 {
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  domain: string
  region: string
  s3: S3
  constructor(storage: IS3Storage) {
    const { accessKeyId, bucket, domain, region, secretAccessKey } =
      storage.config
    this.accessKeyId = accessKeyId
    this.bucket = bucket
    this.secretAccessKey = secretAccessKey
    this.domain = domain
    this.region = region
    this.s3 = new S3({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      }
    })
  }

  async upload(fileName: string) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: fileName, //filename
      Expires: expire //time to expire in seconds,
    })
  }
}
