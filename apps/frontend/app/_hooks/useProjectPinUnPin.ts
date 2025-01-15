import { projectPin, projectUnpin } from '@/services/project'
import { PinnedProjectSetting, useProjectStore } from '@/store/project'
import { Project } from '@prisma/client'
import { messageSuccess, messageWarning } from '@shared/ui'

export const useProjectPinUnpin = () => {
  const { pin, unpin } = useProjectStore()
  const pinProject = (id: string) => {
    pin(id)
    setTimeout(() => {
      projectPin(id)
        .then(res => {
          console.log('pinned project done')
        })
        .catch(err => {
          console.log('pin error ')
          messageWarning('pin one by one please ☹')
          unpin(id)
        })
    }, 500)
  }

  const unpinProject = (id: string) => {
    unpin(id)
    setTimeout(() => {
      projectUnpin(id)
        .then(res => {
          console.log('unpinned project done')
        })
        .catch(err => {
          console.log('unpin error')
          messageWarning('unpin one by one please ☹')
          pin(id)
        })
    }, 500)
  }

  const extractPinNUnpinProjects = (
    projects: Project[],
    pinned: PinnedProjectSetting[]
  ) => {
    const unpin: Project[] = []
    const pin: Project[] = []

    if (!projects || !projects.length)
      return {
        unpin,
        pin
      }

    projects.forEach(p => {
      if (pinned.find(pin => pin.id === p.id)) {
        pin.push(p)
      } else {
        unpin.push(p)
      }
    })

    return {
      pin,
      unpin
    }
  }

  return {
    pinProject,
    unpinProject,
    extractPinNUnpinProjects
  }
}
