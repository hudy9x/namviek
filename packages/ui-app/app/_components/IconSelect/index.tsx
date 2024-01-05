import DynamicIcon from '../DynamicIcon'
import { DropdownMenu } from '@shared/ui'
import './style.css'
import { useState } from 'react'

interface IconSelectProps {
  value: string
  onChange?: (val: string) => void
}

const icons = [
  'GoArchive',
  'GoBeaker',
  'GoBell',
  'GoBriefcase',
  'GoBug',
  'GoBrowser',
  'GoCloud',
  'GoCloudOffline',
  'GoCode',
  // 'GoCodeOfConduct',
  // 'GoCodeReview',
  // 'GoCodeSquare',
  // 'GoCodescan',
  // 'GoCodescanCheckmark',
  // 'GoCodespaces',
  // 'GoColumns',
  // 'GoCommandPalette',
  // 'GoComment',
  // 'GoCommentDiscussion',
  // 'GoCommit',
  // 'GoContainer',
  // 'GoCopilot',
  // 'GoCopy',
  // 'GoCpu',
  // 'GoCreditCard',
  // 'GoCrossReference',
  // 'GoDatabase',
  // 'GoDependabot',
  // 'GoDesktopDownload',
  // 'GoDeviceCameraVideo',
  // 'GoDeviceDesktop',
  // 'GoDeviceMobile',
  // 'GoHome',
  // 'GoHorizontalRule',
  // 'GoHourglass',
  // 'GoHubot',
  // 'GoImage',
  // 'GoInbox',
  // 'GoInfinity',
  // 'GoInfo',
  // 'GoIssueClosed',
  // 'GoKey',
  // 'GoLaw',
  // 'GoLightBulb',
  // 'GoLink',
  // 'GoLinkExternal',
  // 'GoListOrdered',
  // 'GoListUnordered',
  // 'GoLocation',
  // 'GoLock',
  // 'GoLog',
  // 'GoMail',
  // 'GoMegaphone',
  // 'GoMention',
  // 'GoMilestone',
  // 'GoMirror',
  // 'GoMoon',
  // 'GoMortarBoard',
  // 'GoNorthStar',
  // 'GoNote',
  // 'GoNumber',
  // 'GoOrganization',
  // 'GoPackage',
  // 'GoPackageDependencies',
  // 'GoPackageDependents',
  // 'GoPaperAirplane',
  // 'GoQuote',
  // 'GoRead',
  // 'GoRelFilePath',
  // 'GoReply',
  // 'GoRepo',
  // 'GoRepoForked',
  // 'GoRepoLocked',
  // 'GoRepoPush',
  // 'GoRepoTemplate',
  // 'GoReport',
  // 'GoRocket',
  // 'GoRuby',
  // 'GoScreenFull',
  // 'GoScreenNormal',
  // 'GoSearch',
  // 'GoServer',
  // 'GoShare',
  // 'GoShareAndroid',
  // 'GoShield',
  // 'GoShieldCheck',
  // 'GoShieldLock',
  // 'GoShieldSlash',
  // 'GoShieldX',
  // 'GoSidebarCollapse',
  // 'GoSidebarExpand',
  // 'GoStopwatch',
  // 'GoStrikethrough',
  // 'GoSun',
  // 'GoSync',
  // 'GoTab',
  // 'GoTable',
  // 'GoTag',
  // 'GoTasklist',
  // 'GoTelescope',
  // 'GoSquirrel',
  // 'GoStack',
  // 'GoStar',
  // 'GoThumbsup',
  // 'GoTools',
  // 'GoVersions',
  // 'GoVideo',
  // 'GoWorkflow',
  // 'GoTrophy',
  // 'GoTypography',
  // 'GoPulse',
  // 'HiOutlineBattery0',
  // 'HiOutlineBattery100',
  // 'HiOutlineBattery50',
  // 'HiOutlineBeaker',
  // 'HiOutlineBell',
  // 'HiOutlineBellAlert',
  // 'HiOutlineChartBarSquare',
  // 'HiOutlineChartPie',
  // 'HiOutlineChatBubbleBottomCenter',
  // 'HiOutlineChatBubbleBottomCenterText',
  // 'HiOutlineChatBubbleLeft',
  // 'HiOutlineChatBubbleLeftEllipsis',
  // 'HiOutlineChatBubbleLeftRight',
  // 'HiOutlineBookmarkSquare',
  // 'HiOutlineViewColumns',
  // 'HiOutlineBriefcase',
  // 'HiOutlineBugAnt',
  // 'HiOutlineBuildingLibrary',
  // 'HiOutlineFolderPlus',
  // 'HiOutlineForward',
  // 'HiOutlineRectangleGroup',
  // 'HiOutlineRectangleStack',
  // 'HiOutlineRocketLaunch',
  // 'HiOutlineRss',
  // 'HiOutlineScale',
  // 'HiOutlineScissors',
  // 'HiOutlineViewfinderCircle',
  // 'HiOutlineWallet',
  // 'HiOutlineWifi',
  // 'HiOutlineWindow',
  // 'HiOutlineWrench',
  // 'HiOutlineWrenchScrewdriver',
  // 'HiOutlineUser',
  // 'HiOutlineUserCircle',
  // 'HiOutlineUserGroup',
  // 'HiOutlineUserMinus',
  // 'HiOutlineUserPlus',
  // 'HiOutlineUsers',
  // 'HiOutlineCalendar',
  // 'HiOutlineCalendarDays',
  // 'HiOutlineCamera',
  // 'HiOutlineChartBar',
  // 'HiOutlineBars3',
  'HiOutlineBars3BottomLeft',
  'HiOutlineBars3BottomRight',
  'HiOutlineBars3CenterLeft'
]

export default function IconSelect({ value, onChange }: IconSelectProps) {
  const [icon, setIcon] = useState(value)

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger
        className="icon-select-trigger"
        icon={
          <div>
            <DynamicIcon name={icon} />
          </div>
        }
      />
      <DropdownMenu.Content className="icon-select-content">
        {icons.map(icon => {
          return (
            <DropdownMenu.Item
              onClick={() => {
                setIcon(icon)
                onChange && onChange(icon)
              }}
              key={icon}
              title={
                <>
                  <DynamicIcon name={icon} />
                </>
              }
            />
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
