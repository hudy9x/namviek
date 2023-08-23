import ListPreset from '@/components/ListPreset'
import MultiMemberPicker from '@/components/MultiMemberPicker'
import PointSelect from '@/components/PointSelect'
import TaskImport from '@/features/TaskImport'
import { DatePicker } from '@shared/ui'
import './style.css'
import PrioritySelect from '@/components/PrioritySelect'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import { useTaskFilter } from './context'

export default function TaskFilter() {
  const { filter, setFilterValue } = useTaskFilter()
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

  return (
    <div className="task-filter">
      <div>
        <input
          className="text-sm outline-none"
          value={term}
          onChange={ev => {
            setFilterValue('term', ev.target.value)
          }}
          placeholder="Search ..."
        />
      </div>

      <div className="task-filter-actions">
        <FormGroup>
          {/* {!isDateRange && ( */}
          {/*   <ListPreset */}
          {/*     value={dateOperator} */}
          {/*     onChange={val => { */}
          {/*       setFilterValue('dateOperator', val) */}
          {/*     }} */}
          {/*     className="w-[70px]" */}
          {/*     width={70} */}
          {/*     options={[ */}
          {/*       { id: '=', title: '=' }, */}
          {/*       { id: '>', title: '>' }, */}
          {/*       { id: '<', title: '<' } */}
          {/*     ]} */}
          {/*   /> */}
          {/* )} */}
          <ListPreset
            className="w-[150px]"
            value={date}
            onChange={val => {
              setFilterValue('date', val)
            }}
            width={150}
            options={[
              { id: 'today', title: 'Today' },
              { id: 'yesterday', title: 'Yesterday' },
              { id: 'tomorrow', title: 'Tomorrow' },
              { id: 'this-week', title: 'This week' },
              { id: 'this-month', title: 'This month' },
              { id: 'not-set', title: 'Not set' },
              { id: 'date-range', title: 'Date range' }
            ]}
          />
          {isDateRange ? (
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
