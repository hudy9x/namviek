import * as Switch from '@radix-ui/react-switch'
import './style.css'
import { useEffect, useState } from 'react'

interface SwitchProps {
  title?: string
  checked?: boolean
  name?: string
  onChange?: (checked: boolean) => void
  desc?: string | React.ReactNode
  className?: string
  disabled?: boolean
}

export default function SwitchContainer({
  className,
  onChange,
  checked
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState<boolean>(!!checked)

  const handleChange = (checked: boolean) => {
    if (onChange) {
      onChange(checked)
      return
    }
  }

  useEffect(() => {
    if (isChecked !== checked) {
      setIsChecked(!!checked)
      // onChange && onChange(!!checked)
    }
    // eslint-disable-next-line
  }, [checked, isChecked])

  return (
    <Switch.Root
      checked={isChecked}
      onCheckedChange={handleChange}
      className={`switch-root ${className}`}>
      <Switch.Thumb className="switch-thumb" />
    </Switch.Root>
  )
}
