import * as ScrollArea from '@radix-ui/react-scroll-area'
import { CSSProperties, ReactNode } from 'react'
import './style.css'

interface IScrollbarProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
}
export default function Scrollbar({
  children,
  className,
  style
}: IScrollbarProps) {
  const classes = ['scroll-root']
  className && classes.push(className)
  return (
    <ScrollArea.Root className={classes.join(' ')} style={style}>
      <ScrollArea.Viewport className="scroll-viewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="scroll-scrollbar"
        orientation="vertical">
        <ScrollArea.Thumb className="scroll-thumb" />
      </ScrollArea.Scrollbar>
      {/* <ScrollArea.Scrollbar */}
      {/*   className="scroll-scrollbar" */}
      {/*   orientation="horizontal"> */}
      {/*   <ScrollArea.Thumb className="scroll-thumb" /> */}
      {/* </ScrollArea.Scrollbar> */}
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  )
}
