import { OrgStorageType, OrganizationStorage } from '@prisma/client';
// import { orgStorage } from './_prisma';
// import { mdOrgUpdate } from './organization';
import { castToObjectId, organizationStorageModel as orgStorageModel } from "../schema";
import { mdOrgUpdate } from "./org.repository";

export class OrgStorageRepository {
  async getAwsConfig(orgId: string) {
    return orgStorageModel.findOne({
      organizationId: castToObjectId(orgId),
      type: OrgStorageType.AWS_S3
    })
  }

  async updateOrCreateAwsConfig(orgId: string, data: Omit<OrganizationStorage, 'id'>) {
    const result = await orgStorageModel.findOne({
      organizationId: castToObjectId(orgId),
      type: OrgStorageType.AWS_S3
    })

    if (!data.config) return null
    const config = data.config as { [key: string]: string }

    const TB = 1024 * 1024 * 1024 * 1024 // 1TB
    await mdOrgUpdate(orgId, {
      maxStorageSize: 9999 * TB
    })

    if (result) {
      return orgStorageModel.findByIdAndUpdate(result.id, {
        $set: {
          config: config,
          updatedAt: data.updatedAt,
          updatedBy: data.updatedBy
        }
      }
      )
    }

    // FIXME: prisma throw an error if only data provided
    // it's stupid orm =.=!
    // must re-define config object then it works
    return orgStorageModel.create({
      $set: {
        ...data,
        config: {
          bucketName: config.bucketName,
          region: config.region,
          secretKey: config.secretKey,
          accessKey: config.accessKey
        }
      }
    })
  }

}

