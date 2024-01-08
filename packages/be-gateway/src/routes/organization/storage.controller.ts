import { OrgStorageRepository } from '@shared/models'
import { BaseController, Controller, Get, Put, UseMiddleware } from '../../core'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import InternalServerException from '../../exceptions/InternalServerException'
import { OrgStorageType } from '@prisma/client'
import { IStorageAWSConfig } from '../../services/organizationStorage.service'

@Controller('/org-storage')
@UseMiddleware([authMiddleware])
export class OrganizationStorageController extends BaseController {
  @Get('')
  async getOrgStorageConfig() {
    const req = this.req as AuthRequest
    try {
      const { orgId } = req.query as { orgId: string }
      const orgRepo = new OrgStorageRepository()
      const data = await orgRepo.getAwsConfig(orgId)

      return data.config
    } catch (error) {
      throw new InternalServerException()
    }
  }

  @Put('')
  async updateOrgStorage() {
    const req = this.req as AuthRequest
    try {
      const { orgId, config } = req.body as {
        orgId: string
        config: IStorageAWSConfig
      }

      const { id } = req.authen

      const { bucketName, region, secretKey, accessKey } = config

      if (!bucketName || !region || !secretKey || !accessKey) {
        throw new Error('Invalid AWS S3 configuration ')
      }

      const orgRepo = new OrgStorageRepository()
      const result = await orgRepo.updateOrCreateAwsConfig(orgId, {
        organizationId: orgId,
        config: {
          bucketName,
          region,
          secretKey,
          accessKey
        },
        type: OrgStorageType.AWS_S3,
        createdAt: new Date(),
        createdBy: id,
        updatedAt: null,
        updatedBy: null
      })

      return result
    } catch (error) {
      console.log('create or update  org storage error', error)
      throw new InternalServerException()
    }
  }
}
