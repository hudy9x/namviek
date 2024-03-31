import { pmClient } from "packages/shared-models/src/lib/_prisma"
import { CKEY, delCache } from "../../lib/redis"


export default class OrgMemberRemoveService {
  async implement(uid: string, orgId: string) {
    await pmClient.$transaction(async tx => {
      const orgProjectIds = await tx.project.findMany({
        where: {
          organizationId: orgId
        },
        select: {
          id: true
        }
      })

      console.log('projects from organization', orgProjectIds)

      const memberProjectIds = await tx.members.findMany({
        where: {
          uid,
          projectId: {
            in: orgProjectIds.map(p => p.id)
          }
        },
        select: {
          projectId: true
        }
      })

      console.log('project Ids that member belong to', memberProjectIds)

      const projectIds = memberProjectIds.map(p => p.projectId)

      console.log('projec ids list', projectIds)

      if (projectIds.length) {

        await tx.members.deleteMany({
          where: {
            uid,
            projectId: { in: projectIds }
          }
        })
      }

      await tx.organizationMembers.deleteMany({
        where: {
          uid
        }
      })

      /// DELETE cache project member
      const delPromises = []
      for (let i = 0; i < projectIds.length; i++) {
        const pid = projectIds[i];
        const key = [CKEY.PROJECT_MEMBER, pid]

        console.log('delete projectId', pid)

        delPromises.push(delCache(key))
      }

      await Promise.all(delPromises)

    })

    return 1
  }
}

