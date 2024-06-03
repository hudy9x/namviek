import { ProjectViewType } from "@prisma/client"

export const useDefaultViewTypes = () => {
  const views = [
    {
      icon: 'HiOutlineBars3CenterLeft',
      type: ProjectViewType.LIST,
      title: 'List',
      desc: 'Use List view to organize your tasks in anyway imaginable – sort, filter, group, and customize columns.'
    },
    {
      icon: 'HiOutlineViewColumns',
      type: ProjectViewType.BOARD,
      title: 'Board',
      desc: 'Build your perfect Board and easily drag-and-drop tasks between columns.'
    },
    {
      icon: 'HiOutlineCalendar',
      type: ProjectViewType.CALENDAR,
      title: 'Calendar',
      desc: 'Calendar view is your place for planning, scheduling, and resource management.'
    },
  ]

  const otherViews = [

    // {
    //   icon: <TbTimeline />,
    //   type: ProjectViewType.TIMELINE,
    //   title: 'Timeline',
    //   desc: 'Plan out your work over time. See overlaps, map your schedule out and see it all divided by groups.'
    // },
    {
      icon: 'HiOutlineRocketLaunch',
      type: ProjectViewType.GOAL,
      title: 'Goal',
      desc: 'Set multiple goals'
    },
    {
      icon: 'HiOutlineUserGroup',
      type: ProjectViewType.TEAM,
      title: 'Team',
      desc: 'Monitor what people are working on, what has been done, and who needs more tasks with Team view'
    },
    // {
    //   icon: <HiOutlineClipboardDocumentList />,
    //   type: ProjectViewType.ACTIVITY,
    //   title: 'Acitivity',
    //   desc: 'Get an aggregated view of all activity across a location. Filter for people and type to get granular with the activity you see.'
    // },
    {
      icon: 'HiOutlineRectangleGroup',
      type: ProjectViewType.DASHBOARD,
      title: 'Dashboard',
      desc: 'Have a overlook view'
    }
  ]

  return {
    views,
    otherViews
  }
}
