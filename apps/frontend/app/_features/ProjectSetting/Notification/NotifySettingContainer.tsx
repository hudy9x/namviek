import { useUrl } from '@/hooks/useUrl'
import { projectSettingNotify } from '@/services/projectSettingNotify'
import { Form, Switch } from '@shared/ui'
import { useState } from 'react'

let t1 = 0
let t2 = 0
let t3 = 0

export default function NotifySettingContainer({
  taskChanges,
  overdue,
  remind
}: {
  taskChanges: boolean
  remind: boolean
  overdue: boolean
}) {
  const { projectId } = useUrl()
  const [checkTaskChange, setCheckTaskChange] = useState(taskChanges)
  const [checkReminder, setCheckReminder] = useState(remind)
  const [checkOverdues, setCheckOverdue] = useState(overdue)

  const delay = (t: number, cb: () => void) => {
    if (t) clearTimeout(t)
    return setTimeout(() => {
      cb()
    }, 500) as unknown as number
  }

  const onChange = (name: 'task-change' | 'reminder' | 'overdue') => {
    return (val: boolean) => {
      switch (name) {
        case 'task-change':
          t1 = delay(t1, () => {
            projectSettingNotify.update({
              projectId,
              taskChanges: val,
              remind: checkReminder,
              overdue: checkOverdues
            })
          })
          setCheckTaskChange(val)
          break
        case 'reminder':
          t2 = delay(t2, () => {
            projectSettingNotify.update({
              projectId,
              taskChanges: checkTaskChange,
              overdue: checkOverdues,
              remind: val
            })
          })
          setCheckReminder(val)
          break
        case 'overdue':
          t3 = delay(t3, () => {
            // projectSettingNotify.update({
            //   projectId,
            //   overdue: val
            // })
          })
          setCheckOverdue(val)
          break

        default:
          break
      }
    }
  }

  return (
    <div className="setting-container border dark:border-gray-700">
      <form className=" p-4 space-y-6">
        <div className="flex items-start gap-3">
          <Switch
            className="shrink-0"
            checked={checkTaskChange}
            onChange={onChange('task-change')}
          />
          <div className="text-gray-400">
            <h2 className=" text-gray-600 dark:text-gray-300 text-sm font-bold">
              Task changes
            </h2>
            <p className="text-xs mt-1">
              Send me a notification when any task:
              <section className="mt-2">
                <div className="flex items-center gap-3 ">
                  <Form.Checkbox
                    checked={checkTaskChange}
                    className="opacity-60 pointer-events-none"
                  />
                  <p>Change status</p>
                </div>
                <div className="flex items-center gap-3">
                  <Form.Checkbox
                    checked={checkTaskChange}
                    className="opacity-60 pointer-events-none"
                  />
                  <p>Update the progress</p>
                </div>
              </section>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Switch
            checked={checkReminder}
            onChange={onChange('reminder')}
            className="shrink-0"
          />
          <div className="text-gray-400">
            <h2 className=" text-gray-600 dark:text-gray-300 text-sm font-bold">
              Reminders
            </h2>
            <div className="text-xs mt-1 pr-24">
              Remind you of tasks that reaching to due dates
              <section className="mt-2">
                <div className="opacity-60 flex items-center gap-3">
                  <Form.Checkbox checked={checkReminder} />
                  <p>Remind before 1 hour</p>
                </div>
                {/* <div className='flex items-center gap-3'> */}
                {/*   <Form.Checkbox /> */}
                {/*   <p>Remind before 3 hour</p> */}
                {/* </div> */}
                {/* <div className='flex items-center gap-3'> */}
                {/*   <Form.Checkbox /> */}
                {/*   <p>Remind before 12 hour</p> */}
                {/* </div> */}
                {/* <div className='flex items-center gap-3'> */}
                {/*   <Form.Checkbox /> */}
                {/*   <p>Remind before 1 day</p> */}
                {/* </div> */}
              </section>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 opacity-20">
          <Switch
            checked={checkOverdues}
            onChange={onChange('overdue')}
            className="shrink-0"
          />
          <div className="text-gray-400">
            <h2 className=" text-gray-600 dark:text-gray-300 text-sm font-bold">
              Overdues
            </h2>
            <p className="text-xs mt-1 pr-28">
              Each specified times in a day the app will automatically send you
              some overdues warnings.
              <section className="mt-2">
                <div className="flex items-center gap-3">
                  <Form.Checkbox />
                  <p>Remind at every 08:00 am</p>
                </div>
                <div className="flex items-center gap-3">
                  <Form.Checkbox />
                  <p>Remind at every 20:00 pm</p>
                </div>
              </section>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
