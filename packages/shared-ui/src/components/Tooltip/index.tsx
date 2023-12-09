import { ReactNode } from 'react'
import './style.css'
import * as TooltipRadix from '@radix-ui/react-tooltip'

interface ITooltipProps {
  side?: 'top' | 'bottom' | 'left' | 'right'
  title: string
  children: ReactNode
  wrapDiv?: boolean
}

export default function Tooltip({
  title,
  children,
  wrapDiv = false,
  side = 'top'
}: ITooltipProps) {
  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root delayDuration={200}>
        <TooltipRadix.Trigger asChild>
          {wrapDiv ? (
            <div className="tooltip-wrap-div">{children}</div>
          ) : (
            children
          )}
        </TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content
            className="tooltip-content"
            side={side}
            sideOffset={5}>
            {title}
            <TooltipRadix.Arrow className="tooltip-arrow" />
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  )
}
