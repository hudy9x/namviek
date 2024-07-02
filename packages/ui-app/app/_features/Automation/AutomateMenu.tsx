import {
  HiOutlineBolt,
  HiOutlineCalendarDays,
  HiOutlineCog8Tooth
} from 'react-icons/hi2'
import AutomationScheduler from '../AutomationScheduler'
import AutomateRuleList from './AutomateRuleList'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUrl } from '@/hooks/useUrl'

export default function AutomateMenu() {
  const { push } = useRouter()
  const { orgName, projectId } = useParams()
  const { getSp } = useUrl()
  const tab = getSp('tab')

  const [active, setActive] = useState(0)
  const asides = [
    {
      title: 'Rules',
      href: `${orgName}/project/${projectId}?mode=automation&tab=rule`,
      active: !tab ? true : tab === 'rule' ? true : false,
      icon: HiOutlineBolt,
      content: AutomateRuleList,
      desc: "Create rules that automatically respond to actions, schedules, or a card's due date."
    },
    {
      title: 'Scheduler',
      href: `${orgName}/project/${projectId}?mode=automation&tab=schedule`,
      active: tab === 'schedule',
      icon: HiOutlineCalendarDays,
      content: AutomationScheduler,
      desc: 'Scheduled automations make things automatically happen on your board based on a schedule.'
    }
  ]

  // const Content = asides[active].content

  const SelectedContent = asides.find(s => s.active)?.content

  return (
    <div className="pt-8 w-[1024px] ml-8">
      <div className="org">
        <div className="aside-content">
          <aside className="aside-menu">
            {asides.map((aside, aIndex) => {
              const isActive = aside.active ? 'active' : ''
              const Icon = aside.icon
              return (
                <section
                  key={aIndex}
                  // onClick={() => setActive(aIndex)}
                  onClick={() => {
                    push(aside.href)
                  }}
                  className={`${isActive}`}>
                  <h2>
                    <Icon />
                    {aside.title}
                  </h2>
                  <p>{aside.desc}</p>
                </section>
              )
            })}
          </aside>
          <main className="w-full">
            {/* <Content /> */}
            {SelectedContent ? <SelectedContent /> : null}
          </main>
        </div>
      </div>
    </div>
  )
}
