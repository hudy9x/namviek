// import {
//   InvitationStatus,
//   OrganizationMembers,
//   UserStatus
// } from '@prisma/client'
// import { orgMemberModel } from './_prisma'
import { organizationMembersModel as orgMemberModel, InvitationStatus, IOrganizationMemberField, UserStatus, castToObjectId } from "../schema";

export const mdOrgMemberExist = async ({
  orgId,
  uid
}: {
  orgId: string
  uid: string
}) => {
  return orgMemberModel.findOne({
    organizationId: castToObjectId(orgId),
    uid: castToObjectId(uid)
  })
}

export const mdOrgMemberGetAll = async (organizationId: string) => {
  return orgMemberModel.find({
    organizationId: castToObjectId(organizationId),
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

  const users = await orgMemberModel.aggregate([
    {
      $match: {
        organizationId: orgId,
        uid: { $nin: notUids }
      }
    },
    {
      $lookup: {
        from: 'users', // The collection name for users
        localField: 'userId', // Assuming this is your foreign key
        foreignField: '_id',
        as: 'users'
      }
    },
    {
      $match: {
        'users.status': UserStatus.ACTIVE,
        $or: [
          {
            'users.name': {
              $regex: term,
              $options: 'i' // case insensitive
            }
          },
          {
            'users.email': {
              $regex: term,
              $options: 'i' // case insensitive
            }
          }
        ]
      }
    },
    {
      $sort: {
        'users.email': -1 // -1 for desc, 1 for asc
      }
    },
    {
      $project: {
        'users.id': 1,
        'users.name': 1,
        'users.email': 1,
        'users.photo': 1
      }
    },
    {
      $limit: 10
    }
  ]);
  // const users = await orgMemberModel.findMany({
  //   where: {
  //     organizationId: orgId,
  //     uid: {
  //       notIn: notUids
  //     },
  //     users: {
  //       AND: [{ status: UserStatus.ACTIVE }],
  //
  //       OR: [
  //         {
  //           name: {
  //             contains: term,
  //             mode: 'insensitive'
  //           }
  //         },
  //         {
  //           email: {
  //             contains: term,
  //             mode: 'insensitive'
  //           }
  //         }
  //       ]
  //     }
  //   },
  //   take: 10,
  //   orderBy: {
  //     users: {
  //       email: 'desc'
  //     }
  //   },
  //   include: {
  //     users: {
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         photo: true
  //       }
  //     }
  //   }
  // })

  return users
}

export const mdOrgMemberGet = async (orgId: string | string[]) => {
  return orgMemberModel.find({
    organizationId: {
      in: Array.isArray(orgId) ? orgId.map(castToObjectId) : [castToObjectId(orgId)]
    },
    status: InvitationStatus.ACCEPTED
    // where: {
    //   organizationId: {
    //     in: Array.isArray(orgId) ? orgId : [orgId]
    //   },
    //   status: InvitationStatus.ACCEPTED
    // },
    // include: {
    //   users: true
    // }
  }).populate('User')
}

export const mdOrgMemberAdd = async (data: Omit<IOrganizationMemberField, 'id'>) => {
  return orgMemberModel.create({
    data
  })
}
