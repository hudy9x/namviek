import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
import PointSelect from '@/components/PointSelect'
import PrioritySelect from '@/components/PrioritySelect'
import TaskImport from '@/features/TaskImport'
import { DatePicker } from '@shared/ui'
import { useSearchParams } from 'next/navigation'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import CalendarModeFilter from './CalendarModeFilter'
import { ETaskFilterGroupByType, useTaskFilter } from './context'
import './style.css'

interface ITaskFilterProps {
  searchEnabled?: boolean
  pointEnabled?: boolean
  assigneeEnable?: boolean
  importEnable?: boolean
  className?: string
}
export default function TaskFilterAction({
  searchEnabled = true,
  pointEnabled = true,
  assigneeEnable = true,
  importEnable = true,
  className
}: ITaskFilterProps) {
  const { filter, setFilterValue, updateGroupByFilter } = useTaskFilter()
  const search = useSearchParams()
  const mode = search.get('mode')

  const {
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

  return (
    <div className={`task-filter-actions ${className || ''}`}>
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
                className="w-[100px] mr-1 hidden sm:inline-block"
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

      {pointEnabled ? (
        <PointSelect
          value={point}
          onChange={val => {
            setFilterValue('point', val)
          }}
          zero={true}
          infinite={true}
        />
      ) : null}

      <PrioritySelect
        all={true}
        width={130}
        value={priority}
        onChange={val => {
          setFilterValue('priority', val)
        }}
      />

      {assigneeEnable ? (
        <MultiMemberPicker
          all={true}
          value={assigneeIds}
          onChange={val => {
            setFilterValue('assigneeIds', val)
          }}
          compact={true}
          className="task-filter-member-picker"
        />
      ) : null}

      {isCalendarMode ? null : (
        <ListPreset
          value={filter.groupBy}
          onChange={val => {
            updateGroupByFilter(val as ETaskFilterGroupByType)
          }}
          className="w-[150px] mr-1"
          width={150}
          options={[
            {
              id: ETaskFilterGroupByType.STATUS,
              title: 'Status',
              icon: '🚦'
            },
            {
              id: ETaskFilterGroupByType.ASSIGNEE,
              title: 'Assignees',
              icon: '🤓'
            },
            {
              id: ETaskFilterGroupByType.PRIORITY,
              title: 'Priority',
              icon: '🚩'
            }
            // { id: ETaskFilterGroupByType.WEEK, title: 'Week', icon: '📅' }
          ]}
        />
      )}

      {importEnable ? <TaskImport /> : null}
    </div>
  )
}
