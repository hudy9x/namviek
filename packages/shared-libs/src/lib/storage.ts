import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'

const accessKeyId = process.env.S3_ACCESS_KEY || ''
const secretAccessKey = process.env.S3_SECRET_KEY || ''
const bucket = process.env.S3_BUCKET || ''

const client = new S3Client({
  region: 'ap-southeast-1',
  credentials: { accessKeyId, secretAccessKey }
})

const storage = {
  upload: async (file: File, url: string) => {
    const { $metadata } = await client.send(
      new PutObjectCommand({ Bucket: bucket, Key: url, Body: file })
    )
    return $metadata.httpStatusCode
  },

  getList: async (folder: string) => {
    const data = await client.send(
      new ListObjectsCommand({
        Bucket: bucket,
        Delimiter: '/',
        Prefix: folder + '/'
      })
    )
    return (
      (data['Contents']?.map(item => `/${item['Key']}`) as string[]) ||
      undefined
    )
  }
}

export default storage
