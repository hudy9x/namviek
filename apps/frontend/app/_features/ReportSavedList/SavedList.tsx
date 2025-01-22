import { HiOutlineX } from "react-icons/hi"
import { useReportSavedListContext } from "./context"
import { useReportContext } from "../Report/context"

export default function SavedList() {
  const { list, delItem } = useReportSavedListContext()
  const { setAllConfig } = useReportContext()
  return <div className="space-y-1">
    {list.map(item => {
      return <div className="report-box text-xs flex items-center justify-between" onClick={() => {
        if (item.data) {
          setAllConfig(item.data)
        }
      }}>
        <span>
          {item.title}
        </span>
        <HiOutlineX onClick={(ev) => {
          ev.stopPropagation()
          delItem(item.id)
        }} />
      </div>
    })}
  </div>
}
