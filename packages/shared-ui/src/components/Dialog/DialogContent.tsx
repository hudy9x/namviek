import { MouseEvent, ReactNode } from "react";
import DialogClose from "./DialogClose";
import { useDialogContext } from "./context";

export default function DialogContent({
  size = 'base',
  className,
  children
}: {
  className?: string
  children?: ReactNode
  size?: 'sm' | 'base' | 'lg' | 'xl'
}) {

  const { open, onOpenChange } = useDialogContext()
  const visible = open ? 'show' : ''
  const classes = [className]
  size && classes.push(`size-${size}`)
  open && classes.push('show')

  const clickOutSide = () => {
    onOpenChange(false)
  }

  const stopPropagation = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation()
  }

  return <div
    className={`dialog-wrapper ${open ? "" : 'pointer-events-none -z-10'}`}
    onClick={clickOutSide}>
    <div className={`dialog-backdrop ${visible}`}></div>
    <div onClick={stopPropagation} className={`dialog-content ${classes.join(' ')}`}>
      <DialogClose />
      {children}
    </div>
  </div>
}
