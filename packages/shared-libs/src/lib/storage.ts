import { S3 } from 'aws-sdk'
const accessKeyId = process.env.S3_ACCESS_KEY || ''
const secretAccessKey = process.env.S3_SECRET_KEY || ''
const bucket = process.env.S3_BUCKET || ''
const domain = process.env.NEXT_PUBLIC_STORAGE_DOMAIN || ''

const s3 = new S3({
  region: 'ap-southeast-1',
  credentials: { accessKeyId, secretAccessKey }
})

const storage = {
  upload: async (path: string, buffer: Buffer) => {
    const data = await s3
      .upload({ Bucket: bucket, Key: path, Body: buffer })
      .promise()
    // only take relative paths.
    return data.Location.replace(domain, '')
  },
  getFilesInFolder: async (folder: string) => {
    let urls: string[] = []
    s3.listObjectsV2({ Bucket: bucket, Prefix: folder }, (err, data) => {
      if (err || data.Contents) {
        return
      }

      urls = data.Contents.map(item => `/${item.Key}`)
    })

    return urls
  }
}
export default storage
