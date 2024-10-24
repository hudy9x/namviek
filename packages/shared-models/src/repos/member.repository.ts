import { IMemberField, membersModel, MemberRole, castToObjectId } from '../schema'

export const mdMemberGetProject = async (uid: string) => {
  return membersModel.find({
    uid: castToObjectId(uid)
  })
}

export const mdMemberHasRole = async (uid: string, role: MemberRole) => {
  return membersModel.findOne({
    uid: castToObjectId(uid),
    role
  })
}

export const mdMemberUpdateRole = async ({
  uid,
  projectId,
  role
}: {
  uid: string
  projectId: string
  role: MemberRole
}) => {
  return membersModel.updateMany(
    {
      uid: castToObjectId(uid),
      projectId: castToObjectId(projectId)
    },
    {
      $set: { role }
    }
  )
}

export const mdMemberAdd = async (data: Omit<IMemberField, 'id'>) => {
  return membersModel.create(data)
}

export const mdMemberDel = async (uid: string, projectId: string) => {
  return membersModel.deleteMany({
    uid: castToObjectId(uid),
    projectId: castToObjectId(projectId)
  })
}

export const mdMemberAddMany = async (data: Omit<IMemberField, 'id'>[]) => {
  return membersModel.insertMany(data)
}

/*
 * @desc check if member belong to project
 * */
export const mdMemberBelongToProject = async (
  uid: string,
  projectId: string
) => {
  return membersModel.findOne({
    uid: castToObjectId(uid),
    projectId: castToObjectId(projectId)
  })
}

export const mdMemberGetAllByProjectId = async (projectId: string) => {
  return membersModel.find({
    projectId: castToObjectId(projectId)
  }).populate('uid')
}
