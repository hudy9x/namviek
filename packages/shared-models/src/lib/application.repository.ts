import { Application } from '@prisma/client'
import { pmClient } from './_prisma'

const mdApp = pmClient.application
export class ApplicationRepository {
  async create(data: Omit<Application, 'id'>) {
    return mdApp.create({
      data
    })
  }

  async getByOrgId(organizationId: string) {
    return mdApp.findMany({
      where: {
        organizationId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
