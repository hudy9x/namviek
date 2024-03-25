import { ReactNode } from 'react'

export interface ITimelineItem {
  id: string
  title: string
  start: Date
  end: Date
}

export interface ITimelineProps {
  height?: string
  year: number
  month: number
  children: (data: ITimelineItem) => ReactNode
  items: ITimelineItem[]
  onChange?: (data: { id: string; start: Date; end: Date }) => void
}
