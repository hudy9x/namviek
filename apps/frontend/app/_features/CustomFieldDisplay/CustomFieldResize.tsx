import { fieldSv } from "@/services/field"
import { useProjectCustomFieldStore } from "@/store/customFields"
import { useCallback, useEffect, useState } from "react"

export default function CustomFieldResize({ id, index, width }: { index: number, id: string, width: number }) {

  const updateFieldWidth = useProjectCustomFieldStore(state => state.updateFieldWidth)
  const [resizing, setResizing] = useState({ index: -1, startX: 0, width: 0 })
  const [newWidth, setNewWidth] = useState(-1)

  const handleMouseDown = useCallback((clientX: number, width: number) => {
    setResizing({ index, startX: clientX, width })
  }, [index])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (resizing.index !== -1) {
      const initialWidth = resizing.width
      const diff = e.clientX - resizing.startX
      const newWidth = Math.max(100, initialWidth + diff)

      setNewWidth(newWidth)
      updateFieldWidth(resizing.index, newWidth)
    }
  }, [resizing, updateFieldWidth])

  const handleMouseUp = useCallback(() => {
    setResizing({ index: -1, startX: 0, width: 0 })
    if (newWidth != -1 && id) {
      console.log('update field width on database')
      fieldSv.update({
        id,
        width: newWidth
      }).then(res => {
        console.log('ok', res.data)
      })
      setNewWidth(-1)
    }
  }, [newWidth, id])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])


  return <div
    onMouseDown={ev => {
      ev.stopPropagation()
      ev.preventDefault()
      // only trigger when user press left mouse
      if (ev.button !== 0) {
        return
      }
      handleMouseDown(ev.clientX, width)
    }}
    className="absolute w-3 h-full right-0 top-0 cursor-ew-resize group">
    <div className="absolute rounded-full w-1 h-full right-0 top-0 group-hover:bg-gray-400"></div>
  </div>
}
