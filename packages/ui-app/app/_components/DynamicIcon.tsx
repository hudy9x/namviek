import loadable from '@loadable/component'
import { Suspense, memo } from 'react'
import { IconBaseProps, IconType } from 'react-icons/lib'

import {
  HiOutlineBattery0,
  HiOutlineBattery100,
  HiOutlineBattery50,
  HiOutlineBeaker,
  HiOutlineBell,
  HiOutlineBellAlert,
  HiOutlineChartBarSquare,
  HiOutlineChartPie,
  HiOutlineChatBubbleBottomCenter,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineChatBubbleLeft,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBookmarkSquare,
  HiOutlineViewColumns,
  HiOutlineBriefcase,
  HiOutlineBugAnt,
  HiOutlineBuildingLibrary,
  HiOutlineFolderPlus,
  HiOutlineForward,
  HiOutlineRectangleGroup,
  HiOutlineRectangleStack,
  HiOutlineRocketLaunch,
  HiOutlineRss,
  HiOutlineScale,
  HiOutlineScissors,
  HiOutlineViewfinderCircle,
  HiOutlineWallet,
  HiOutlineWifi,
  HiOutlineWindow,
  HiOutlineWrench,
  HiOutlineWrenchScrewdriver,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUserMinus,
  HiOutlineUserPlus,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineCalendarDays,
  HiOutlineCamera,
  HiOutlineChartBar,
  HiOutlineBars3,
  HiOutlineBars3BottomLeft,
  HiOutlineBars3BottomRight,
  HiOutlineBars3CenterLeft
} from 'react-icons/hi2'
import { GoLaw, GoVersions, GoCodeOfConduct } from 'react-icons/go'

const icons: { [key: string]: IconType } = {
  GoLaw,
  GoVersions,
  GoCodeOfConduct,

  HiOutlineBattery0,
  HiOutlineBattery100,
  HiOutlineBattery50,
  HiOutlineBeaker,
  HiOutlineBell,
  HiOutlineBellAlert,
  HiOutlineChartBarSquare,
  HiOutlineChartPie,
  HiOutlineChatBubbleBottomCenter,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineChatBubbleLeft,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBookmarkSquare,
  HiOutlineViewColumns,
  HiOutlineBriefcase,
  HiOutlineBugAnt,
  HiOutlineBuildingLibrary,
  HiOutlineFolderPlus,
  HiOutlineForward,
  HiOutlineRectangleGroup,
  HiOutlineRectangleStack,
  HiOutlineRocketLaunch,
  HiOutlineRss,
  HiOutlineScale,
  HiOutlineScissors,
  HiOutlineViewfinderCircle,
  HiOutlineWallet,
  HiOutlineWifi,
  HiOutlineWindow,
  HiOutlineWrench,
  HiOutlineWrenchScrewdriver,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUserMinus,
  HiOutlineUserPlus,
  HiOutlineUsers,
  HiOutlineCalendar,
  HiOutlineCalendarDays,
  HiOutlineCamera,
  HiOutlineChartBar,
  HiOutlineBars3,
  HiOutlineBars3BottomLeft,
  HiOutlineBars3BottomRight,
  HiOutlineBars3CenterLeft
}

interface typesPropsIcon {
  name: string
  propsIcon?: IconBaseProps
}

function DynamicIcon({ name, propsIcon }: typesPropsIcon) {
  console.log(name in icons)
  if (name in icons) {
    const Icon = icons[name] as IconType
    return <Icon />
  }

  return null
}

export default memo(DynamicIcon)
