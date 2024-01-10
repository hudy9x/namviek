import { HiOutlineBolt, HiOutlineCalendarDays, HiOutlineCog8Tooth } from "react-icons/hi2"
import AutomationScheduler from "../AutomationScheduler"
import AutomateRuleList from "./AutomateRuleList"
import { useState } from "react"

export default function AutomateMenu() {

  const [active, setActive] = useState(0)
  const asides = [
    {
      title: "Rules",
      icon: HiOutlineBolt,
      content: AutomateRuleList,
      desc: "Create rules that automatically respond to actions, schedules, or a card's due date."
    },
    {
      title: "Scheduler",
      icon: HiOutlineCalendarDays,
      content: AutomationScheduler,
      desc: "Scheduled automations make things automatically happen on your board based on a schedule."
    },
  ]

  const Content = asides[active].content

  return <div className="pt-12 w-[1200px] ml-12">
    <div className="org">
      <div className="aside-content">
        <aside className="aside-menu">
          {asides.map((aside, aIndex) => {
            const isActive = aIndex === active ? 'active' : ''
            const Icon = aside.icon
            return <section key={aIndex}
              onClick={() => setActive(aIndex)}
              className={`${isActive}`}>
              <h2>
                <Icon />
                {aside.title}</h2>
              <p>{aside.desc}</p>
            </section>
          })}
        </aside>
        <main className="w-full">
          <Content />
        </main>
      </div>
    </div>
  </div>
}
