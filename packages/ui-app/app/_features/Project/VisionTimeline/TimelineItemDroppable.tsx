import { useServiceTaskUpdate } from "@/hooks/useServiceTaskUpdate";
import { DragEvent, ReactNode, useRef } from "react";

export default function TimelineItemDroppable({ id, children }: { id: string, children: ReactNode }) {
  const { updateTaskData } = useServiceTaskUpdate()
  const dropElem = useRef<HTMLDivElement>(null)
  const allowDrop = (ev: DragEvent<HTMLDivElement>) => {
    highlight(true)
    ev.preventDefault()
  }

  const highlight = (enable: boolean) => {
    if (!dropElem.current) return
    if (enable) {
      dropElem.current.classList.add('goal-zone-enter')
    } else {
      dropElem.current.classList.remove('goal-zone-enter')
    }
  }

  const onDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData("text");
    highlight(false)

    updateTaskData({
      id: taskId,
      visionId: id
    })
  }

  return <div
    ref={dropElem}
    onDragOver={allowDrop}
    onDragEnter={() => {
      highlight(true)
      console.log('enter')
    }}
    onDragLeave={() => {
      highlight(false)
      console.log('leave')
    }}
    onDrop={onDrop}>{children}</div>
}
