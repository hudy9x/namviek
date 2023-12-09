import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

interface IActivityCardProps {
  activityId?: string
  creator: ReactNode
  title: ReactNode
  content?: ReactNode
  meta?: ReactNode
}

export default function ActivityCard({
  activityId,
  creator,
  title,
  content,
  meta
}: IActivityCardProps) {
  const searchParams = useSearchParams()
  const searchActivityId = searchParams.get('activity')
  const focused = activityId && searchActivityId === activityId

  const className = `activity-card ${focused ? 'card-focused' : ''}`

  return (
    <div className={className}>
      {focused && <div className="highlight-bar"></div>}
      <div>{creator}</div>
      <div>
        {title}
        {content}
        {meta}
      </div>
    </div>
  )
}
