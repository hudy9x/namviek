import { MouseEvent, ReactNode } from "react";
import DialogClose from "./DialogClose";
import { useDialogContext } from "./context";

export default function DialogContent({
  size = 'base',
  className,
  position = 'center',
  children
}: {
  className?: string
  children?: ReactNode
  size?: 'sm' | 'base' | 'lg' | 'xl'
  position?: 'center' | 'right'
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

  let pos = 'justify-center py-[100px]'
  if (position === 'right') {
    pos = 'justify-end p-3 '
    classes.push('h-full')
  }

  return <div
    className={`dialog-wrapper ${open ? "" : 'pointer-events-none -z-10'}`}
    style={!open ? { overflowY: 'hidden' } : {}}
    onClick={clickOutSide}>
    <div className={`dialog-backdrop ${visible}`}></div>
    <div className={`${open ? 'overflow-y-auto' : ''} h-full z-10 relative`}>
      <div className={`flex items-center ${pos} h-full`}>
        <div onClick={stopPropagation} className={`dialog-content ${classes.join(' ')}`}>
          <DialogClose />
          {children}
        </div>
      </div>
    </div>
  </div>
}
