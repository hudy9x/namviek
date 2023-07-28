import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { DateRange, DayPicker } from 'react-day-picker'

const pastMonth = new Date()

export default function OverviewDateRange() {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  }
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)

  return (
    <div className="bg-white border rounded-md p-3">
      <DayPicker
        id="test"
        mode="range"
        defaultMonth={pastMonth}
        selected={range}
        onSelect={setRange}
      />
    </div>
  )
}
