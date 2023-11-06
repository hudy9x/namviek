import { ReactNode } from 'react'

interface IActivityCardProps {
  creator: ReactNode
  title: ReactNode
  content?: ReactNode
  meta?: ReactNode
}

export default function ActivityCard({
  creator,
  title,
  content,
  meta
}: IActivityCardProps) {
  return (
    <div className="activity-card">
      <div>{creator}</div>
      {title}
      {content}
      {meta}
    </div>
  )
}
