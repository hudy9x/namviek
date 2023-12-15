import { dateFormat } from '@shared/libs'
import { Tooltip } from '@shared/ui'

export default function Time({ date }: { date: Date }) {
  const time = dateFormat(date, 'Pp')
  const hour = dateFormat(date, 'HH:mm aa')

  return (
    <Tooltip title={time}>
      <span className="activity-time">{hour}</span>
    </Tooltip>
  )
}
