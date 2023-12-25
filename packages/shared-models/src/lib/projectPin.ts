import { PinnedProjectSetting, UserSetting } from '../type'
import { pmClient } from './_prisma'
import { mdUserFindFirst, mdUserUpdateSetting } from './user'

const _getPinnedProjectList = async (
  uid: string
): Promise<PinnedProjectSetting[]> => {
  const user = await mdUserFindFirst({
    id: uid
  })

  if (!user) return []

  const settings = user.settings as unknown as UserSetting

  if (!settings || !settings.pinnedProjects) {
    return []
  }

  return settings.pinnedProjects
}

export const mdProjectPinGet = async (uid: string) => {
  const pinnedProjects = await _getPinnedProjectList(uid)
  return pinnedProjects
}

const _updatePinSetting = async ({
  type,
  uid,
  projectId
}: {
  type: 'pin' | 'unpin'
  uid: string
  projectId: string
}) => {
  await pmClient.$transaction(async tx => {
    const user = await tx.user.findFirst({
      where: {
        id: uid
      }
    })

    if (!user) return

    const settings = user.settings as unknown as UserSetting

    if (!settings || !settings.pinnedProjects) {
      return
    }

    const { pinnedProjects } = settings

    if (type === 'pin') {
      pinnedProjects.push({
        id: projectId,
        createdAt: new Date()
      })

      await tx.user.update({
        where: { id: uid },
        data: {
          settings: { ...settings, ...{ pinnedProjects } }
        }
      })

      // unpin project
    } else {
      const updatedPinnedProjects = pinnedProjects.filter(
        p => p.id !== projectId
      )

      await tx.user.update({
        where: { id: uid },
        data: {
          settings: {
            ...settings,
            ...{ pinnedProjects: updatedPinnedProjects }
          }
        }
      })
    }
  })
}

export const mdProjectUnpin = async ({
  uid,
  projectId
}: {
  uid: string
  projectId: string
}) => {
  return _updatePinSetting({
    type: 'unpin',
    projectId,
    uid
  })
  // const pinnedProjects = await _getPinnedProjectList(uid)
  //
  // if (!pinnedProjects.length) {
  //   return null
  // }
  //
  // const updatedPinnedProjects = pinnedProjects.filter(p => p.id !== projectId)
  //
  // return await mdUserUpdateSetting(uid, {
  //   pinnedProjects: updatedPinnedProjects
  // })
}

export const mdProjectPinAdd = async ({
  uid,
  projectId
}: {
  uid: string
  projectId: string
}) => {
  return _updatePinSetting({
    type: 'pin',
    projectId,
    uid
  })
  // const pinnedProjects = await _getPinnedProjectList(uid)
  //
  // pinnedProjects.push({
  //   id: projectId,
  //   createdAt: new Date()
  // })
  //
  // return await mdUserUpdateSetting(uid, {
  //   pinnedProjects
  // })
}
