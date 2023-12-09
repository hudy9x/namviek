import { format, formatDistanceToNowStrict, isValid } from 'date-fns'
import * as Popover from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { AiOutlineCalendar } from 'react-icons/ai'
import 'react-day-picker/dist/style.css'
import './style.css'

export interface IDatePicker {
  className?: string
  disabled?: boolean
  title?: string
  value?: Date
  onChange?: (d: Date) => void
  placeholder?: string
  toNow?: boolean
}

export default function DatePicker({
  title,
  className,
  disabled,
  value,
  onChange,
  toNow = false,
  placeholder
}: IDatePicker) {
  const [selected, setSelected] = useState<Date>()
  const [visible, setVisible] = useState(false)

  // fill default value
  useEffect(() => {
    value && setSelected(value)
  }, [value])

  const onDatepickerChange = (d: Date) => {
    onChange && onChange(d)
  }

  const showDateStr = (d: Date) => {
    if (toNow) {
      return formatDistanceToNowStrict(d, { addSuffix: true })
    }

    return format(d, 'PP')
  }

  return (
    <div className={`form-control ${className}`}>
      {title ? <label>{title}</label> : null}
      <div className="form-control-wrapper relative">
        <Popover.Root open={visible} onOpenChange={setVisible}>
          <Popover.Trigger asChild>
            <div>
              <div
                className="form-input cursor-pointer whitespace-nowrap pr-8"
                tabIndex={-1}>
                {selected && isValid(selected) ? (
                  showDateStr(selected)
                ) : placeholder ? (
                  <span className="text-gray-400">{placeholder}</span>
                ) : (
                  <span className="text-transparent">Empty</span>
                )}
              </div>
              <AiOutlineCalendar className="absolute top-1/2 -translate-y-1/2 right-2.5 text-gray-400" />
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content sideOffset={4} className="popover-content">
              <DayPicker
                mode="single"
                selected={selected}
                showOutsideDays
                fixedWeeks
                onSelect={value => {
                  setVisible(false)
                  setSelected(value)
                  value && onDatepickerChange(value)
                }}
              />
              {/* <Popover.Arrow className="popover-arrow" /> */}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  )
}
