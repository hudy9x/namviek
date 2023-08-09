import { DayPicker } from 'react-day-picker'
import { useOverviewContext } from './context'

const pastMonth = new Date()

export default function OverviewDateRange() {
  const { range, setRange } = useOverviewContext()

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
