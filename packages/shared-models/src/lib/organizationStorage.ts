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
          config: data.config,
          updatedAt: data.updatedAt,
          updatedBy: data.updatedBy
        }
      })
    }


    return orgStorage.create({
      data
    })
  }

}

