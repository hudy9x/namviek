import ListPreset from "@/components/ListPreset";
import { dateFormat, genCalendarArr, getMonthList } from "@shared/libs";
import { Button, FormGroup, ListItemValue } from "@shared/ui";
import { useState } from "react";
import { useReportContext } from "./context";

function useWeekList(d: number) {
  const now = new Date()
  const m = new Date(now.getFullYear(), d - 1, 1)
  const arr = genCalendarArr(m)

  let selectedWeek = ''

  const weeks: ListItemValue[] = arr.map((a, ak) => {
    const start = a[0];
    const end = a[a.length - 1]

    const id = ak + ''

    if (now.getTime() >= start.getTime() && now.getTime() <= end.getTime()) {
      selectedWeek = id
    }

    return { title: `${dateFormat(start, 'MM/dd')} - ${dateFormat(end, 'MM/dd')}`, id }
  })

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

export default function ReportHeader() {
  const { monthOptions } = useMonthList()
  const { selectedMonth, setSelectedMonth } = useReportContext()
  const { weekOptions, selectedWeek } = useWeekList(parseInt(selectedMonth, 10))

  return <div className='report-header'>
    <div className="report-container">
      <h2 className="text-lg font-medium">Summary report</h2>
      <div className="flex items-center gap-2">
        <FormGroup>
          <Button size="sm" title="Monthly" />
          <Button size="sm" title="Weekly" />
        </FormGroup>
        <ListPreset size="sm" width={120} value={selectedMonth} options={monthOptions} onChange={val => {
          setSelectedMonth(val)
        }} />
        <ListPreset size="sm" value={selectedWeek} options={weekOptions} width={150} />
      </div>
    </div>
  </div>
}
