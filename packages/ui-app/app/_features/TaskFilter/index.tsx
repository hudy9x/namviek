import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelect from '@/components/PrioritySelect'
import TaskImport from '@/features/TaskImport'
import { DatePicker } from '@shared/ui'
import { useSearchParams } from 'next/navigation'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import CalendarModeFilter from './CalendarModeFilter'
import { useTaskFilter } from './context'
import './style.css'

let timeout = 0
export default function TaskFilter() {
  const [txt, setTxt] = useState('')
  const { filter, setFilterValue } = useTaskFilter()
  const search = useSearchParams()
  const mode = search.get('mode')

  const {
    term,
    dateOperator,
    date,
    startDate,
    endDate,
    point,
    priority,
    assigneeIds
  } = filter

  const isDateRange = date === 'date-range'
  const isCalendarMode = mode === 'calendar'
  const showOperator = ['this-month', 'this-week', 'today']

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      console.log('update search term')
      setFilterValue('term', txt)
    }, 250) as unknown as number
  }, [txt])

  return (
    <div className="task-filter">
      <div className="flex items-center gap-2">
        <AiOutlineSearch className="text-gray-400" />
        <input
          className="text-sm outline-none dark:bg-gray-900"
          value={txt}
          onChange={ev => {
            setTxt(ev.target.value)
          }}
          placeholder="Search ..."
        />
      </div>

      <div className="task-filter-actions">
        <FormGroup>
          {isCalendarMode ? (
            <CalendarModeFilter />
          ) : (
            <>
              {date && showOperator.includes(date) && (
                <ListPreset
                  value={dateOperator}
                  onChange={val => {
                    setFilterValue('dateOperator', val)
                  }}
                  className="w-[100px] mr-1"
                  width={100}
                  options={[
                    { id: '=', title: 'Equal' },
                    { id: '>', title: 'After' },
                    { id: '<', title: 'Before' }
                  ]}
                />
              )}
              <ListPreset
                className="w-[150px]"
                value={date}
                onChange={val => {
                  setFilterValue('date', val)
                  setFilterValue('dateOperator', '=')
                }}
                width={180}
                options={[
                  { id: 'today', title: '📆 Today' },
                  { id: 'yesterday', title: '📆 Yesterday' },
                  { id: 'tomorrow', title: '📆 Tomorrow' },
                  { id: 'this-week', title: '📆 This week' },
                  { id: 'this-month', title: '📆 This month' },
                  { id: 'not-set', title: '📆 Not set' },
                  { id: 'date-range', title: '📆 Date range' }
                ]}
              />
            </>
          )}
          {isDateRange && !isCalendarMode ? (
            <>
              <DatePicker
                value={startDate}
                onChange={val => {
                  setFilterValue('startDate', val)
                }}
              />
              <DatePicker
                value={endDate}
                onChange={val => {
                  setFilterValue('endDate', val)
                }}
              />
            </>
          ) : null}
        </FormGroup>
        <PointSelect
          value={point}
          onChange={val => {
            setFilterValue('point', val)
          }}
          zero={true}
          infinite={true}
        />
        <PrioritySelect
          all={true}
          width={130}
          value={priority}
          onChange={val => {
            setFilterValue('priority', val)
          }}
        />
        <MultiMemberPicker
          all={true}
          value={assigneeIds}
          onChange={val => {
            setFilterValue('assigneeIds', val)
          }}
          compact={true}
          className="task-filter-member-picker"
        />
        <TaskImport />
      </div>
    </div>
  )
}
