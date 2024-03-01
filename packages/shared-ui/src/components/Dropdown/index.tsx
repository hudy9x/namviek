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
  children,
  title,
  size = 'base'
}: {
  icon?: ReactNode
  className?: string
  children?: ReactNode
  title?: string
  size?: 'sm' | 'base' | 'lg'
}) => {
  return (
    <DropdownMenu.Trigger className={className} asChild>
      <div className='dropdown-trigger-btn'>
        {children ? children : <Button leadingIcon={icon} title={title} size={size} />}
      </div>
    </DropdownMenu.Trigger>
  )
}

const DropdownContent = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className={`dropdown-menu-content ${className || ''}`} sideOffset={5}>
        {children}
        {/* <DropdownMenu.Arrow className="dropdown-arrow" /> */}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}

const DropdownItem = ({
  title,
  active,
  icon,
  right,
  disabled,
  onClick
}: {
  active?: boolean
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
      className={`dropdown-item ${active ? 'dropdown-item-active' : ''}`}>
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
