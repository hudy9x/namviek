import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelectMultiple from '@/components/PrioritySelectMultiple'
import TaskImport from '@/features/TaskImport'
import { DatePicker, DatePickerBorderless } from '@shared/ui'

export default function TaskFilter() {
  return (
    <div className="sticky top-0 left-0 z-30 py-2 px-4 border-b bg-white flex items-center justify-between">
      <div>
        <input className="text-sm outline-none" placeholder="Search ..." />
      </div>

      <div className="flex items-center gap-3">
        <ListPreset
          className="w-full"
          width={150}
          options={[
            { id: 'today', title: 'Today' },
            { id: 'this-week', title: 'This week' },
            { id: 'this-month', title: 'This month' },
            { id: 'next-week', title: 'Next week' },
            { id: 'next-month', title: 'Next month' },
            { id: 'prev-week', title: 'Prev week' },
            { id: 'prev-month', title: 'Prev month' },
            { id: 'date-range', title: 'Date range' }
          ]}
        />
        <DatePicker />
        <DatePicker />
        <PointSelect />
        <PrioritySelectMultiple />
        <MultiMemberPicker />
        <TaskImport />
      </div>
    </div>
  )
}
