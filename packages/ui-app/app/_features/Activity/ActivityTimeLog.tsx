interface IActivityTimeLog {
  edited?: boolean
  time: Date
}

export function ActivitiTimeLog({ time, edited }: IActivityTimeLog) {
  return <div>{`${time.toLocaleTimeString()}${edited ? ' (edited)' : ''}`}</div>
}
