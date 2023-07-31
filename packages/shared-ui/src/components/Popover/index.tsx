import * as Popover from '@radix-ui/react-popover'
import './style.css'
import { SetStateAction } from 'react'
import { MdClose } from 'react-icons/md'

interface PopoverProps {
  triggerBy: React.ReactNode
  title: string
  desc?: string
  visible?: boolean
  onVisibleChange?: React.Dispatch<SetStateAction<boolean>>
  content: React.ReactNode
  backdrop?: boolean
}

export default function PopoverContainer({
  triggerBy,
  title,
  visible = false,
  onVisibleChange,
  content
}: PopoverProps) {
  return (
    <Popover.Root open={visible} onOpenChange={onVisibleChange}>
      <Popover.Trigger asChild>{triggerBy}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="popover-content" sideOffset={5}>
          {title ? <div className="popover-title">{title}</div> : null}
          {content}
          <Popover.Close asChild={false}>
            <button className="popover-close" aria-label="Close">
              <MdClose />
            </button>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
