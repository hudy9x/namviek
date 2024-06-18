import ListPreset from "@/components/ListPreset";
import { getMonthList } from "@shared/libs";
import { ListItemValue } from "@shared/ui";

export default function ReportHeader() {
  const monthList = getMonthList()
  const now = new Date()

  const options: ListItemValue[] = monthList.map((m, idx) => {
    const id = (idx + 1).toString()

    return {
      title: m,
      id
    }
  })

  const selected = now.getMonth() + 1

  return <div className='report-header'>
    <div className="report-container flex items-center justify-between">
      <h2>Daily report</h2>
      <div>
        <ListPreset value={selected.toString()} options={options} />
      </div>
    </div>
  </div>
}
