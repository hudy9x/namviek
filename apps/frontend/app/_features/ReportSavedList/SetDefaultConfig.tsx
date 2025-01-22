import { useEffect } from "react"
import { ISavedItem, reportStore, useReportSavedListContext } from "./context"
import { useReportContext } from "../Report/context"

export default function SetDefaultConfig() {
  const { setAllConfig } = useReportContext()

  useEffect(() => {
    reportStore.keys().then(async keys => {
      if (!keys || !keys.length) return

      const first = keys[0]
      const item = await reportStore.getItem(first) as ISavedItem
      if (!item) return
      setAllConfig(item.data)
    })

  }, [])
  return <></>
}
