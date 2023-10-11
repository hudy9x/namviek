import { create } from 'zustand'
import { produce } from 'immer'

interface Widget {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number,
  static: boolean
}

const DEFAULT_X_1 = 0
const DEFAULT_X_2 = 6
const DEFAULT_HEIGHT = 2
const DEFAULT_WIDTH = 6

export const defaultWidget: Widget =  {
  i: '',
  x: 0,
  y: 0,
  w: DEFAULT_WIDTH,
  h: DEFAULT_HEIGHT,
  static: false,
}


interface ProjectWidget {
  widgets: Widget[]
  count: number,
  addWidget: () => void 
}

export const useProjectWidget = create<ProjectWidget>(set => ({
  widgets: [],
  count: 0,
  addWidget: () => {
    set(
      produce((state: ProjectWidget) => {

        const newWidget: Widget = {...defaultWidget}
        const firstWidget = state.widgets[state.widgets.length - 1]
        if (firstWidget) {
          firstWidget.x === DEFAULT_X_1 ? newWidget.x = DEFAULT_X_2 : newWidget.x = DEFAULT_X_1 
          state.count % 2 === 0 ? newWidget.y = firstWidget.y : newWidget.y = state.count  
        }

        state.count += 1
        newWidget.i = `${state.count}`
        state.widgets.push(newWidget)
      })
    )
  }
}))