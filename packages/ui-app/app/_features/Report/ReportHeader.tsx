import ListPreset from "@/components/ListPreset";
import { dateFormat, genCalendarArr, getLastDateOfMonth, getMonthList } from "@shared/libs";
import { Button, FormGroup, ListItemValue } from "@shared/ui";
import { useEffect } from "react";
import { IReportTimeFilter, useReportContext } from "./context";

function useWeekList(d: number) {
  const now = new Date()
  const m = new Date(now.getFullYear(), d - 1, 1)
  const arr = genCalendarArr(m)

  let selectedWeek = ''
  let firstId = ''

  const weeks: ListItemValue[] = arr.map((a, ak) => {
    const start = a[0];
    const end = a[a.length - 1]

    const startStr = dateFormat(start, 'yyyy/MM/dd');
    const endStr = dateFormat(end, 'yyyy/MM/dd')
    const id = `${startStr}-${endStr}`

    firstId = !firstId ? id : firstId;

    if (!selectedWeek && now.getTime() >= start.getTime() && now.getTime() <= end.getTime()) {
      selectedWeek = id
    }

    return { title: `${dateFormat(start, 'MM/dd')} - ${dateFormat(end, 'MM/dd')}`, id }
  })

  if (!selectedWeek) {
    selectedWeek = firstId
  }

  return {
    weekOptions: weeks,
    selectedWeek
  }
}

function useMonthList() {
  const monthList = getMonthList()

  const options: ListItemValue[] = monthList.map((m, idx) => {
    const id = (idx + 1).toString()

    return {
      title: m,
      id
    }
  })

  return { monthOptions: options }
}

function ReportHeaderTimeFilter() {
  const { setTimeFilter, timeFilter } = useReportContext()
  return <FormGroup>
    <Button size="sm" onClick={() => {
      setTimeFilter(IReportTimeFilter.WEEK)
    }} disabled={timeFilter === IReportTimeFilter.WEEK} title="Weekly" />
    <Button size="sm" onClick={() => {
      setTimeFilter(IReportTimeFilter.MONTH)
    }} disabled={timeFilter === IReportTimeFilter.MONTH} title="Monthly" />
  </FormGroup>
}

function ReportHeaderDuration() {
  const { monthOptions } = useMonthList()
  const { selectedMonth, setSelectedMonth, setDuration, timeFilter } = useReportContext()
  const { weekOptions, selectedWeek, } = useWeekList(parseInt(selectedMonth || '1', 10))

  useEffect(() => {
    onSelectWeek(selectedWeek)
  }, [selectedWeek])

  const onSelectWeek = (val: string) => {
    if (timeFilter === IReportTimeFilter.MONTH) return
    setDuration(val)
  }

  const onSelectMonth = (val: string) => {
    setSelectedMonth(val)

    if (timeFilter === IReportTimeFilter.MONTH) {
      const d1 = new Date()
      const y = d1.getFullYear()

      const lastDate = getLastDateOfMonth(new Date(y, +val - 1, 1))
      const duration = `${y}/${val}/1-${y}/${val}/${lastDate.getDate()}`
      console.log(duration)
      setDuration(duration)
    }
  }

  useEffect(() => {
    if (timeFilter === IReportTimeFilter.MONTH) {
      onSelectMonth(selectedMonth)
    }

    if (timeFilter === IReportTimeFilter.WEEK) {
      onSelectWeek(selectedWeek)
    }



  }, [timeFilter, selectedMonth, selectedWeek])

  return <>
    <ListPreset size="sm" width={120} value={selectedMonth} options={monthOptions} onChange={onSelectMonth} />
    {timeFilter === IReportTimeFilter.WEEK ?
      <ListPreset size="sm" value={selectedWeek} onChange={val => {
        console.log('val', val)
        setDuration(val)
      }} options={weekOptions} width={150} />
      : null}

  </>
}

export default function ReportHeader() {

  return <div className='report-header'>
    <div className="report-container">
      <h2 className="text-lg font-medium">Summary report</h2>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <ReportHeaderTimeFilter />
          <ReportHeaderDuration />
        </div>
        <div>
          {/* <FormGroup> */}
          {/*   <Button title="Separate" size="sm" /> */}
          {/*   <Button title="Group" size="sm" /> */}
          {/* </FormGroup> */}
        </div>
      </div>
    </div>
  </div>
}
