interface IActivityTimeLog {
  edited?: boolean
  time: Date
  url?: string
}

export function ActivityTimeLog({ time, edited, url }: IActivityTimeLog) {
  return (
    <a
      href={url}
      className="hover:underline cursor-pointer">{`${time.toLocaleTimeString()}${
      edited ? ' (edited)' : ''
    }`}</a>
  )
}
