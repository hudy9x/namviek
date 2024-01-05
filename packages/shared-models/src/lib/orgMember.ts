import {
  InvitationStatus,
  OrganizationMembers,
  UserStatus
} from '@prisma/client'
import { orgMemberModel } from './_prisma'

export const mdOrgMemberExist = async ({
  orgId,
  uid
}: {
  orgId: string
  uid: string
}) => {
  return orgMemberModel.findFirst({
    where: {
      organizationId: orgId,
      uid
    }
  })
}

export const mdOrgMemberGetAll = async (organizationId: string) => {
  return orgMemberModel.findMany({
    where: {
      organizationId
    }
  })
}

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
        AND: [{ status: UserStatus.ACTIVE }],

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
