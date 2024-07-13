import { KeyboardEvent, useRef, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { useVisionContext } from "../Vision/context";
import TimelineItemDelete from "./TimelineItemDelete";

export default function TimelineTitle({ title, id }: { title: string, id: string }) {
  const { updateVision } = useVisionContext()
  const [newTitle, setTitle] = useState(title)
  const [editable, setEditable] = useState(false)
  const inpRef = useRef<HTMLInputElement>(null)
  const onChange = (ev: KeyboardEvent<HTMLInputElement>) => {
    const key = ev.key
    if (key === 'Escape') {
      setEditable(false)
      return
    }

    if (key !== 'Enter') {
      return
    }

    const target = ev.target as HTMLInputElement
    console.log(target.value)

    updateVision({
      id,
      name: target.value
    })

    setEditable(false)

  }

  const showTitle = editable ? "hidden" : ""

  return <div className="flex items-center gap-2 group">
    <span className={showTitle}>{title}</span>
    <input className={`bg-transparent inline-block ${editable ? "" : "hidden"}`}
      ref={inpRef}
      onBlur={() => {
        setEditable(false)
      }}
      onClick={ev => ev.stopPropagation()}
      onKeyUp={onChange}
      value={newTitle} onChange={(ev) => {
        setTitle(ev.target.value)
      }} />

    <div className="flex items-center gap-0.5">

      <HiOutlinePencil className="group-hover:opacity-100 opacity-0 btn-icon" onClick={(ev) => {
        ev.stopPropagation()
        setEditable(true)
        setTimeout(() => {
          if (inpRef.current) {
            inpRef.current.focus()
          }
        }, 200);
      }} />

      <TimelineItemDelete id={id} />

    </div>
  </div>
}
