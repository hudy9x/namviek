import * as Tabs from '@radix-ui/react-tabs'
import './style.css'
import { ReactNode } from 'react'

interface ITabProps {
  defaultValue?: string
  children: ReactNode
}

export default function Tab({ children, defaultValue = '' }: ITabProps) {
  return <Tabs.Root defaultValue={defaultValue} className="tab-root">{children}</Tabs.Root>
}

Tab.List = ({ children }: { children: ReactNode }) => {
  return <Tabs.List className="tab-list">{children}</Tabs.List>
}
Tab.Trigger = ({ children, value }: { children: ReactNode; value: string }) => {
  return (
    <Tabs.Trigger className="tab-trigger" value={value}>
      {children}
    </Tabs.Trigger>
  )
}
Tab.Content = ({ children, value }: { children: ReactNode; value: string }) => {
  return (
    <Tabs.Content className="tab-content" value={value}>
      {children}
    </Tabs.Content>
  )
}
