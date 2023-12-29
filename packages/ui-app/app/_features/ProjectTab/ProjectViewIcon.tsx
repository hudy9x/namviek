import { ProjectViewType } from '@prisma/client'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import {
  HiOutlineCalendar,
  HiOutlineClipboardDocumentList,
  HiOutlineRectangleGroup,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
  HiOutlineViewColumns
} from 'react-icons/hi2'
import { TbTimeline } from 'react-icons/tb'

export default function ProjectViewIcon({ type }: { type: ProjectViewType }) {
  const getIcon = () => {
    if (type === ProjectViewType.LIST) {
      return <HiOutlineMenuAlt1 />
    }

    if (type === ProjectViewType.BOARD) {
      return <HiOutlineViewColumns />
    }

    if (type === ProjectViewType.CALENDAR) {
      return <HiOutlineCalendar />
    }

    if (type === ProjectViewType.TIMELINE) {
      return <TbTimeline />
    }

    if (type === ProjectViewType.GOAL) {
      return <HiOutlineRocketLaunch />
    }
    if (type === ProjectViewType.TEAM) {
      return <HiOutlineUserGroup />
    }

    if (type === ProjectViewType.ACTIVITY) {
      return <HiOutlineClipboardDocumentList />
    }

    return <HiOutlineRectangleGroup />
  }

  return <>{getIcon()}</>
}
