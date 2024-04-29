import { MouseEvent, ReactNode, useEffect } from "react";
import DialogClose from "./DialogClose";
import { useDialogContext } from "./context";

const useEscapeKeyPressed = (func: () => void, deps?: React.DependencyList | undefined) => {

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      console.log('called escape', ev.key)
      if (ev.key === 'Escape') {
        console.log('called function')
        func()
      }
    }

    console.log('register keyup event dialog')
    document.addEventListener('keyup', handler)

    return () => {
      document.removeEventListener('keyup', handler)

    }

    // eslint-disable-next-line
  }, deps)
}

export default function DialogContent({ children }: { children?: ReactNode }) {

  const { open, onOpenChange } = useDialogContext()

  // useEscapeKeyPressed(() => {
  //   onOpenChange(false)
  // }, [onOpenChange, open])

  // if (!open) return null

  const clickOutSide = () => {
    onOpenChange(false)
  }

  const stopPropagation = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation()
  }

  const visible = open ? 'show' : ''

  return <div className={`dialog-wrapper ${open ? "" : 'pointer-events-none -z-10'}`} onClick={clickOutSide}>
    <div className={`dialog-backdrop ${visible}`}></div>
    <div onClick={stopPropagation} className={`dialog-content size-lg ${visible}`}>
      <DialogClose />
      {children}
    </div>
  </div>
}
