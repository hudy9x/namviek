import ListPreset from '@/components/ListPreset'
import { Button, DatePicker, FormGroup } from '@shared/ui'
import { useExportFilter } from './context'
import {
  AiOutlineCloudDownload,
  AiOutlineExport,
  AiOutlineFilter
} from 'react-icons/ai'
import MultiProjectPicker from '@/components/ProjectSelectMultiple'
import { ITaskExport, columns } from '.'
import { format } from 'date-fns'
import { TaskType } from '@prisma/client'

export default function ExportFilter({ data }: { data: ITaskExport[] }) {
  const { filter, setFilterValue } = useExportFilter()
  const { date, startDate, endDate, projectIds } = filter
  const isDateRange = date === 'date-range'

  const onExport = () => {
    const exportDatas = []

    const headings: string[] = ['#']
    columns.map(col => {
      headings.push(col.title)
    })

    exportDatas.push(headings.join(','))

    data.forEach((dt, index) => {
      const row: (string | number)[] = [++index]
      columns.map(col => {
        let val = dt[col.name as keyof ITaskExport]
        if (typeof val === 'string') {
          val = val.replace(/,/g, ';')
        }

        if (col.name === 'type') {
          val = val || TaskType.TASK
        }

        row.push(val ? val : '-')
      })

      exportDatas.push(row.join(','))
    })

    const csvContent = exportDatas.join('\n')
    const a = document.createElement('a')
    const date = new Date()
    a.textContent = 'download'
    a.download = `Export-Data-${format(date, 'yyyyMMddhhmmss')}.csv`
    a.href =
      'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csvContent)
    a.click()
  }

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
          size="sm"
          onClick={onExport}
          title="Export"
          leadingIcon={<AiOutlineCloudDownload />}
          primary
        />
      </div>
    </div>
  )
}
