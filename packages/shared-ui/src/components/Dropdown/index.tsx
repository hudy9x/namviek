import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import './style.css'
import { ReactNode } from 'react'
import Button from '../Button'

export default function DropdownMenuContainer({
  children
}: {
  children: ReactNode
}) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>
}

const DropdownTrigger = ({
  icon,
  className,
  title,
  size = 'base'
}: {
  icon?: ReactNode
  className?: string
  title: string
  size?: 'sm' | 'base' | 'lg'
}) => {
  return (
    <DropdownMenu.Trigger className={className} asChild>
      <div>
        <Button leadingIcon={icon} title={title} size={size} />
      </div>
    </DropdownMenu.Trigger>
  )
}

const DropdownContent = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="dropdown-menu-content" sideOffset={5}>
        {children}
        {/* <DropdownMenu.Arrow className="dropdown-arrow" /> */}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}

const DropdownItem = ({
  title,
  icon,
  right,
  disabled,
  onClick
}: {
  icon?: ReactNode
  title: ReactNode
  right?: ReactNode
  disabled?: boolean
  onClick?: () => void
}) => {

  return (
    <DropdownMenu.Item
      onClick={(ev) => {
        ev.stopPropagation()
        onClick && onClick()
      }}
      disabled={disabled}
      className="dropdown-item">
      {icon ? <span className='mr-2'>{icon}</span> : null}
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
