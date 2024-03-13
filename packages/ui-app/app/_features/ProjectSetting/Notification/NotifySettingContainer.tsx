import { useUrl } from '@/hooks/useUrl'
import { projectSettingNotify } from '@/services/projectSettingNotify'
import { Switch } from '@shared/ui'
import { useState } from 'react'

let t1 = 0
let t2 = 0
let t3 = 0

export default function NotifySettingContainer({ taskChanges, overdue, remind }: { taskChanges: boolean, remind: boolean, overdue: boolean }) {
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
              taskChanges: val
            })
          })
          setCheckTaskChange(val)
          break
        case 'reminder':
          t2 = delay(t2, () => {
            projectSettingNotify.update({
              projectId,
              remind: val
            })
          })
          setCheckReminder(val)
          break
        case 'overdue':
          t3 = delay(t3, () => {
            projectSettingNotify.update({
              projectId,
              overdue: val
            })
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
            <h2 className=" text-gray-600 text-sm font-bold">Task changes</h2>
            <p className="text-xs mt-1">
              Send me a notification when any task changes.
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
            <h2 className=" text-gray-600 text-sm font-bold">Reminders</h2>
            <div className="text-xs mt-1 pr-24">
              These are notifications to remind you of deadlines you might have
              missed
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Switch
            checked={checkOverdues}
            onChange={onChange('overdue')}
            className="shrink-0"
          />
          <div className="text-gray-400">
            <h2 className=" text-gray-600 text-sm font-bold">Overdues</h2>
            <p className="text-xs mt-1 pr-28">
              These are notifications to remind you of overdues you might have
              missed
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
