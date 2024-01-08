import { OrgStorageType, OrganizationStorage } from '@prisma/client';
import { orgStorage } from './_prisma';
import { mdOrgUpdate } from './organization';

export class OrgStorageRepository {
  async getAwsConfig(orgId: string) {
    return orgStorage.findFirst({
      where: {
        organizationId: orgId,
        type: OrgStorageType.AWS_S3
      }
    })
  }

  async updateOrCreateAwsConfig(orgId: string, data: Omit<OrganizationStorage, 'id'>) {
    const result = await orgStorage.findFirst({
      where: {
        organizationId: orgId,
        type: OrgStorageType.AWS_S3
      }
    })

    if (!data.config) return null
    const config = data.config as { [key: string]: string }

    const TB = 1024 * 1024 * 1024 * 1024 // 1TB
    await mdOrgUpdate(orgId, {
      maxStorageSize: 9999 * TB
    })

    if (result) {
      return orgStorage.update({
        where: {
          id: result.id
        },
        data: {
          config: config,
          updatedAt: data.updatedAt,
          updatedBy: data.updatedBy
        }
      })
    }

    // FIXME: prisma throw an error if only data provided
    // it's stupid orm =.=!
    // must re-define config object then it works
    return orgStorage.create({
      data: {
        ...data, config: {
          bucketName: config.bucketName,
          region: config.region,
          secretKey: config.secretKey,
          accessKey: config.accessKey
        }
      }
    })
  }

}

