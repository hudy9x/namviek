import { OrgStorageRepository } from "@database";
import { OrgStorageType } from "@prisma/client";

export interface IStorageAWSConfig {
  bucketName: string
  region: string
  secretKey: string
  accessKey: string
  maxStorageSize: number
}

export interface IStorageConfig {
  type: OrgStorageType
  config: IStorageAWSConfig
}

export default class OrganizationStorageService {
  protected orgId: string
  protected repo: OrgStorageRepository

  constructor(orgId: string) {
    this.repo = new OrgStorageRepository()
    this.orgId = orgId
  }

  async getConfig(): Promise<IStorageConfig | null> {
    const storage = await this.repo.getAwsConfig(this.orgId)

    if (!storage) {
      return null
    }

    return {
      type: storage.type,
      config: storage.config as unknown as IStorageAWSConfig
    }
  }
}
