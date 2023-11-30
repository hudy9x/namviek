import { MemberRole, Members, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const mdProject = prisma.project
const mdOrgMember = prisma.organizationMembers
const mdProjectMember = prisma.members

export const dummyMemberToAllProject = () => {
  console.log('dummy member to all project')
  mdProject.findMany().then(projects => {
    if (!projects) return
    projects.forEach(p => {
      console.log(p.id, p.name)

      mdOrgMember
        .findMany({
          where: {
            organizationId: p.organizationId
          }
        })
        .then(orgMembers => {
          mdProjectMember
            .findMany({
              where: {
                projectId: p.id
              }
            })
            .then(pMembers => {
              console.log('members', pMembers)

              const notAdded: Omit<Members, 'id'>[] = []
              orgMembers.forEach(ogmem => {
                const exist = pMembers.some(p => p.uid === ogmem.uid)
                if (!exist) {
                  notAdded.push({
                    projectId: p.id,
                    role: MemberRole.MEMBER,
                    uid: ogmem.uid,
                    createdAt: new Date(),
                    createdBy: null,
                    updatedAt: null,
                    updatedBy: null
                  })
                }
              })

              if (!notAdded || !notAdded.length) {
                console.log('all users added to this project')
                return
              }

              mdProjectMember
                .createMany({
                  data: notAdded
                })
                .then(res => {
                  console.log(`project member of ${p.name} added`)
                })
            })
        })
    })
  })
}
