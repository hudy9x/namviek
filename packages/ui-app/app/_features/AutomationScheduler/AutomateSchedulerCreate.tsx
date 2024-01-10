import TriggerEveryday from "./TriggerEveryday";
import TriggerEverySingleDayInWeek from "./TriggerEverySingleDayInWeek";
import ActionList from "./ActionList";
import { useState } from "react";
import { ISchedulerTrigger, SchedulerProvider } from "./context";
import TriggerPresent from "./TriggerPresent";

export default function AutomateSchedulerCreate() {
  const today = new Date()
  const [trigger, setTrigger] = useState<ISchedulerTrigger>({
    every: '',
    at: {
      hour: today.getHours(),
      minute: today.getMinutes(),
      period: 'am'
    }
  })
  // const [action, setActions] = useState<IScheduleAction>({
  //   group: '',
  //   config: {
  //     title: '',
  //     content: ''
  //   }
  // })

  const _setTrigger = (trigger: ISchedulerTrigger) => {
    const clonedTrigger = structuredClone(trigger)
    setTrigger(clonedTrigger)
  }

  const onCreate = () => {
    console.log(trigger)
  }

  const noTrigger = !trigger.every
  const hasTrigger = trigger.every
  // const showCreateBtn = trigger.every && action.group

  return <SchedulerProvider value={{
    trigger,
    setTrigger: _setTrigger,
    // action
  }}>
    <div className="px-2">
      <h2 className="text-2xl font-bold mb-2">Create a scheduled automation</h2>
      <p className="text-sm text-gray-500 mb-3">Scheduled automations make things automatically happen on your board based on a schedule.

        <br />
        To learn more about scheduled automations and what they can do, visit the automation support page.

      </p>
      {noTrigger ?
        <section className="space-y-3">
          <h2 className="text-gray-600 mb-2">Trigger</h2>
          <TriggerEveryday />
          <TriggerEverySingleDayInWeek />
        </section>
        : null}

      {hasTrigger ? <TriggerPresent /> : null}


      {hasTrigger ?
        <section className="mt-4 space-y-3">
          <h2 className="text-gray-600 mb-2">Actions</h2>
          <ActionList />
        </section>
        : null}

    </div>
  </SchedulerProvider>
}
