import { projectView } from '@/services/projectView'
import { useUrl } from '@/hooks/useUrl'
import { useProjectViewList } from '@/features/ProjectView/useProjectViewList'
import { useProjectViewStore } from '@/store/projectView'
import { IBoardFilter } from '@/features/ProjectView/context'
import { ICalendarView } from './context'
import { JsonObject } from '@prisma/client/runtime/library'

const useCalendarViewUpdate = () => {
  const { getSp } = useUrl()
  const { views } = useProjectViewList()
  const { updateView } = useProjectViewStore()

  const mode = getSp('mode')
  const view = views.find(v => v.id === mode)

  let calendarView = ICalendarView.MONTH

  let viewData = {} as IBoardFilter
  if (view && view?.data) {
    console.log({ viewData: view.data })
    try {
      viewData = view.data as unknown as IBoardFilter
      const { calendarMode } = viewData
      if (calendarMode) calendarView = calendarMode as ICalendarView
    } catch (e) {
      console.log('CalendarView has no option data')
    }
  }

  const updateCalendarView = (calendarViewMode: ICalendarView) => {
    if (view) {
      viewData = { ...viewData, calendarMode: calendarViewMode }
      const newView = { ...view, data: viewData as unknown as JsonObject }

      projectView
        .update(newView)
        .then(res => {
          const { data } = res
          console.log({ data })
        })
        .catch(err => {
          console.log({ updateCalendarView: err })
        })

      updateView(view.id, newView)
    }
  }

  return { calendarView, updateCalendarView }
}

export { useCalendarViewUpdate }
