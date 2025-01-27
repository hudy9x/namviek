import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { IStorageProvider } from './IStorageProvider';

export interface IDigitalOceanConfig {
  region: string;
  accessKey: string;
  secretKey: string;
  bucketName: string;
  orgId: string;
  endpoint?: string;
}

export default class DigitalOceanStorageProvider implements IStorageProvider {
  private client: S3Client;
  private bucket: string;
  private endpoint: string;

  constructor(config: IDigitalOceanConfig) {
    this.bucket = config.bucketName;
    this.endpoint = config.endpoint || '';

    this.client = new S3Client({
      region: 'us-east-1',
      endpoint: `https://${config.region}.digitaloceanspaces.com`,
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey
      },
      forcePathStyle: false
    });
  }

  randomObjectKeyName(name: string): string {
    const splitName = name.split('.');
    const sliceName = splitName.slice(0, -1);
    sliceName.push(randomUUID());
    return `${sliceName.join('-')}.${splitName[splitName.length - 1]}`;
  }

  async createPresignedUrlWithClient(name: string, type: string): Promise<string> {
    console.log('digital ocean generate presigned url', name, type)
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: name,
      ContentType: type,
      ACL: "public-read"
    });
    console.log('command', command)
    const signedUrl = getSignedUrl(this.client, command, { expiresIn: 3600 });
    return signedUrl
  }

  getObjectURL(name: string): string {
    return `https://${this.endpoint}/${encodeURIComponent(name)}`;
  }

  async getObject(name: string): Promise<string | null> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: name
    });

    try {
      const response = await this.client.send(command);
      return await response.Body?.transformToString() || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteObject(name: string): Promise<boolean | null> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: name
    });

    try {
      const response = await this.client.send(command);
      return response.DeleteMarker || false;
    } catch (error) {
      console.log('delete object error', error);
      return null;
    }
  }
} 
