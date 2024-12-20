import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useOverviewContext } from '../Project/Overview/context'
import DbComponent from './components/DbComponent'
import { useState } from 'react'
import { Button, messageError } from '@shared/ui'
import { HiOutlineSaveAs } from 'react-icons/hi'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { dboardUpdateLayout } from '@/services/dashboard'


const ResponsiveGridLayout = WidthProvider(Responsive)

export default function DboardComponentList() {
  const { components, setComponents } = useOverviewContext()
  const [currentLayout, setCurrentLayout] = useState<Layout[]>([])

  const layout = components.map(component => ({
    i: component.id,
    x: component.x ?? 0,
    y: component.y ?? 0,
    w: component.width ?? 3,
    h: component.height ?? 1
  }))

  const handleLayoutChange = (newLayout: Layout[]) => {
    setCurrentLayout(newLayout)
  }

  const handleSaveLayout = async () => {
    try {
      const updatedComponents = components.map(component => {
        const layoutItem = currentLayout.find(item => item.i === component.id)
        if (layoutItem) {
          return {
            ...component,
            x: layoutItem.x,
            y: layoutItem.y,
            width: layoutItem.w,
            height: layoutItem.h
          }
        }
        return component
      })

      await dboardUpdateLayout(updatedComponents)
      setComponents(updatedComponents)
    } catch (error) {
      messageError('Failed to save layout')
      console.error('Failed to save layout:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          leadingIcon={<HiOutlineSaveAs />}
          onClick={handleSaveLayout}
          className="flex items-center gap-2"
          title='Save layout'
        />
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
      >
        {components.map(component => (
          <div key={component.id}>
            <DbComponent component={component} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}
