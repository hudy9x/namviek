import isSameDay from 'date-fns/isSameDay'

interface IActivityTimeLog {
  edited?: boolean
  time: Date
  url?: string
}

export function ActivityTimeLog({ time, edited, url }: IActivityTimeLog) {
  let displayedTime: string

  if (isSameDay(time, new Date())) {
    displayedTime = time.toLocaleTimeString()
  } else displayedTime = time.toLocaleString()

  return (
    <a
      href={url}
      className="hover:underline cursor-pointer">{`${displayedTime}${
      edited ? ' (edited)' : ''
    }`}</a>
  )
}
