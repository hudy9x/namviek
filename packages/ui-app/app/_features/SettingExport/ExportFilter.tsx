import ListPreset from '@/components/ListPreset'
import { Button, DatePicker, FormGroup } from '@shared/ui'
import { useExportFilter } from './context'
import {
  AiOutlineCloudDownload,
  AiOutlineExport,
  AiOutlineFilter
} from 'react-icons/ai'
import MultiProjectPicker from '@/components/ProjectSelectMultiple'

export default function ExportFilter() {
  const { filter, setFilterValue } = useExportFilter()
  const { date, startDate, endDate, projectIds } = filter
  const isDateRange = date === 'date-range'

  return (
    <div className="export-filter">
      <div className="filter-actions">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <AiOutlineFilter />
          <span>Filter</span>
        </div>

        <FormGroup>
          <MultiProjectPicker
            all={true}
            value={projectIds}
            onChange={val => {
              setFilterValue('projectIds', val)
            }}
          />
          <ListPreset
            className="w-[150px]"
            value={date}
            onChange={val => {
              setFilterValue('date', val)
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
      </div>
      <div>
        <Button
          onClick={() => {
            console.log('a')
          }}
          title="Export"
          leadingIcon={<AiOutlineCloudDownload />}
          primary
        />
      </div>
    </div>
  )
}
