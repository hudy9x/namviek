import { format, formatDistanceToNowStrict, isValid } from 'date-fns'
import * as Popover from '@radix-ui/react-popover'
import { ChangeEvent, useEffect, useState } from 'react'
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker'
import { AiOutlineCalendar } from 'react-icons/ai'
import 'react-day-picker/dist/style.css'
import './style.css'

export interface IDatePicker {
  className?: string
  disabled?: boolean
  enableTimer?: boolean
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
  enableTimer,
  value,
  onChange,
  toNow = false,
  placeholder
}: IDatePicker) {
  const [selected, setSelected] = useState<Date>()
  const [visible, setVisible] = useState(false)
  const [time, setTime] = useState(
    `${selected?.getHours()}:${selected?.getMinutes()}`
  )

  // fill default value
  useEffect(() => {
    setSelected(value)
    if (value) {
      const h = value.getHours()
      const m = value.getMinutes()

      setTime(`${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}`)
    }
    // value && setSelected(value)
  }, [value])

  const extractHourNMin = (time: string) => {
    const [hour, min] = time.split(':')
    return { hour, min }
  }

  const onDatepickerChangeHandler: SelectSingleEventHandler = value => {
    setVisible(false)
    setSelected(value)
    if (value) {
      const [hour, min] = time.split(':')

      onDatepickerChange(
        new Date(
          value.getFullYear(),
          value.getMonth(),
          value.getDate(),
          +hour,
          +min
        )
      )
    }
  }

  const onDatepickerChange = (d: Date) => {
    onChange && onChange(d)
  }

  const onTimerChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    const time = ev.target.value
    const [hour, min] = time.split(':')

    if (selected) {
      onDatepickerChange(
        new Date(
          selected.getFullYear(),
          selected.getMonth(),
          selected.getDate(),
          +hour,
          +min
        )
      )
    }

    setTime(time)
  }

  const showDateStr = (d: Date) => {
    if (toNow) {
      return formatDistanceToNowStrict(d, { addSuffix: true })
    }

    return format(d, 'PP')
  }

  const showTimer = () => {
    if (!enableTimer) return null
    const { hour, min } = extractHourNMin(time)
    const suffix = +hour > 12 ? 'PM' : 'AM'
    return (
      <span className="pl-1">
        at {+hour > 12 ? +hour - 12 : hour}:{min} {suffix}
      </span>
    )
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
                  <>
                    {showDateStr(selected)}
                    {showTimer()}
                  </>
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
                onSelect={onDatepickerChangeHandler}
              />

              <div className="rdp-timer-container">
                <span>Pick a time:</span>
                <input
                  className="rdp-timer"
                  type="time"
                  value={time}
                  onChange={onTimerChangeHandler}
                />
              </div>
              {/* <Popover.Arrow className="popover-arrow" /> */}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  )
}
