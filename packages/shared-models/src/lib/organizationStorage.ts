import { OrgStorageType, OrganizationStorage } from '@prisma/client';
import { orgStorage } from './_prisma';

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

