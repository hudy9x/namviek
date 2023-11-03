import { useState } from 'react'

export default function VisionTimelineTrack({
  id,
  startCol,
  endCol,
  rowStart
}: {
  id: string
  startCol: number
  endCol: number
  rowStart: number
}) {
  const [position, setPosition] = useState({
    start: startCol,
    end: endCol
  })

  return (
    <div
      style={{
        gridColumnStart: position.start,
        gridColumnEnd: position.end,
        gridRowStart: rowStart
      }}
      className="h-7 bg-indigo-100"></div>
  )
}
