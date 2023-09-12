import { storageModel } from './_prisma'

export const mdStorageByOrgId = async (orgId: string) => {
  return storageModel.findFirst({
    where: {
      organizationId: orgId
    }
  })
}
