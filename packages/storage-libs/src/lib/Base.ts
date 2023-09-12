import { StorageData } from '../interface/storage'
import AwsS3 from './S3'

export class StorageBase {
  constructor(storageData: StorageData) {
    switch (storageData.type) {
      case 'AWS_S3':
        return new AwsS3(storageData)
      default:
        return new AwsS3(storageData)
    }
  }

  async upload(fileName: string): Promise<string> {
    throw new Error('Abstract method!')
  }
}
