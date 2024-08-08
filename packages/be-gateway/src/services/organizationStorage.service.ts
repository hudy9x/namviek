import { OrgStorageRepository } from "@shared/models";
export interface IStorageAWSConfig {
  bucketName: string
  region: string
  secretKey: string
  accessKey: string
  maxStorageSize: number
}

export default class OrganizationStorageService {
  protected orgId: string
  protected repo: OrgStorageRepository

  constructor(orgId: string) {
    this.repo = new OrgStorageRepository()
    this.orgId = orgId
  }

  async getConfig() {
    const config = await this.repo.getAwsConfig(this.orgId)

    if (!config) {
      return null
    }

    const awsConfig = config.config as unknown as IStorageAWSConfig
    return awsConfig

  }
}
