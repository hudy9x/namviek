import * as ScrollArea from '@radix-ui/react-scroll-area'
import { CSSProperties, ReactNode } from 'react'
const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

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
      <ScrollArea.Viewport className="ScrollAreaViewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical">
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      {/* <ScrollArea.Scrollbar */}
      {/*   className="ScrollAreaScrollbar" */}
      {/*   orientation="horizontal"> */}
      {/*   <ScrollArea.Thumb className="ScrollAreaThumb" /> */}
      {/* </ScrollArea.Scrollbar> */}
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  )
}
