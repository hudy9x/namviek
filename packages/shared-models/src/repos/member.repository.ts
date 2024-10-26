import { IMemberField, membersModel, MemberRole, castToObjectId, transformToId } from '../schema'

export const mdMemberGetProject = async (uid: string) => {
  const members = await membersModel.find({
    uid: castToObjectId(uid)
  }).lean() as unknown as IMemberField[]

  if (members && members.length) {
    console.log('run herer')
    return members.map(transformToId)
  }

  return members
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
  const members = await membersModel.find({
    projectId: castToObjectId(projectId)
  }).populate('uid').lean() as unknown as IMemberField[]

  if (members && members.length) {
    return members.map((m: any) => {
      m.id = m._id.toString()
      m.users = m.uid
      return m
    })
  }
  return members

}
