import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
// import {fromIni} from "@aws-sdk/credential-providers";
// import {HttpRequest} from "@smithy/protocol-http";
import { getSignedUrl, S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
// import {parseUrl} from "@smithy/url-parser";
// import {formatUrl} from "@aws-sdk/util-format-url";
// import {Hash} from "@smithy/hash-node";

const AWS_REGION = process.env.AWS_REGION
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET

console.log('AWS keys')
console.log(process.env.AWS_REGION)
console.log(process.env.AWS_S3_BUCKET)
console.log(process.env.AWS_ACCESS_KEY)
console.log(process.env.AWS_SECRET_ACCESS_KEY)

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

export const randomObjectKeyName = (name: string) => {
  const splitName = name.split('.')
  const sliceName = splitName.slice(0, -1)

  sliceName.push(randomUUID())

  name = `${sliceName.join('-')}.${splitName[splitName.length - 1]}`
  return name
}

export const createPresignedUrlWithClient = (name: string, type: string) => {
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: name,
    ContentType: type
  })
  return getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

export const getObjectURL = (name: string) => {
  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${name}`
}

export const deleteObject = async (name: string) => {
  const command = new DeleteObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: name
  })

  try {
    const response = await s3Client.send(command)
    return response.DeleteMarker
  } catch (error) {
    console.log('delete oobject s3 error', error)
    return null
  }
}

export const getObject = async (name: string) => {
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: name
  })

  try {
    const response = await s3Client.send(command)
    const str = await response.Body.transformToString()
    return str
  } catch (error) {
    console.log(error)
    return null
  }
}

export function beStorage(): string {
  return 'be-storage'
}
