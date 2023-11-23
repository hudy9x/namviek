import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import './style.css'
import { ReactNode } from 'react'

export default function DropdownMenuContainer({
  children
}: {
  children: ReactNode
}) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>
}

const DropdownTrigger = ({ title }: { title: string }) => {
  return (
    <DropdownMenu.Trigger asChild>
      <button className="btn" aria-label="Customise options">
        {title}
      </button>
    </DropdownMenu.Trigger>
  )
}

const DropdownContent = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="dropdown-menu-content" sideOffset={5}>
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}

const DropdownItem = ({
  title,
  right,
  disabled,
  onClick
}: {
  title: ReactNode
  right?: ReactNode
  disabled?: boolean
  onClick?: () => void
}) => {
  return (
    <DropdownMenu.Item
      onClick={() => onClick && onClick()}
      disabled={disabled}
      className="dropdown-item">
      {title} {right ? <div className="right-slot">{right}</div> : null}
    </DropdownMenu.Item>
  )
}

const DropdownSeparator = () => {
  return <DropdownMenu.Separator className="dropdown-separator" />
}

const DropdownLabel = () => (
  <DropdownMenu.Label className="dropdown-label">People</DropdownMenu.Label>
)

DropdownMenuContainer.Trigger = DropdownTrigger
DropdownMenuContainer.Content = DropdownContent
DropdownMenuContainer.Item = DropdownItem
DropdownMenuContainer.Separator = DropdownSeparator
DropdownMenuContainer.Label = DropdownLabel
