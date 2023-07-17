import { InvitationStatus, OrganizationMembers } from '@prisma/client'
import { orgMemberModel, orgModel, userModel } from './_prisma'

export const mdOrgMemberSeach = async ({
  orgId,
  term,
  notUids
}: {
  orgId: string
  term: string
  notUids: string[]
}) => {
  const users = await orgMemberModel.findMany({
    where: {
      organizationId: orgId,
      uid: {
        notIn: notUids
      },
      users: {
        OR: [
          {
            name: {
              contains: term
            }
          },
          {
            email: {
              contains: term
            }
          }
        ]
      }
    },
    take: 10,
    orderBy: {
      users: {
        email: 'desc'
      }
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          photo: true
        }
      }
    }
  })

  return users
}

export const mdOrgMemberGet = async (orgId: string | string[]) => {
  return orgMemberModel.findMany({
    where: {
      organizationId: {
        in: Array.isArray(orgId) ? orgId : [orgId]
      },
      status: InvitationStatus.ACCEPTED
    },
    include: {
      users: true
    }
  })
}

export const mdOrgMemberAdd = async (data: Omit<OrganizationMembers, 'id'>) => {
  return orgMemberModel.create({
    data
  })
}

// export const mdOrgAdd = async (data: Omit<Organization, 'id'>) => {
//   return orgModel.create({
//     data: data
//   });
// };
//
// export const mdOrgMemGetByUid = async (uid: string) => {
//   return orgMemberModel.findMany({
//     where: {
//       uid
//     }
//   });
// };
//
// export const mdOrgMemAdd = async (data: Omit<OrganizationMembers, 'id'>) => {
//   return orgMemberModel.create({
//     data
//   });
// };
//
// export const mdOrgMemAddMany = async (data: Omit<OrganizationMembers, 'id'>[]) => {
//   return orgMemberModel.createMany({
//     data: data
//   });
// };
