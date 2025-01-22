import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useOverviewContext } from '../Project/Overview/context'
import DbComponent from './components/DbComponent'
import { useState } from 'react'
import { messageError, messageSuccess } from '@ui-components'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { IUpdateLayoutComponent, dboardUpdateLayout } from '@/services/dashboard'
import DashboardComponentCreate from './DasboardComponentCreate'
import { useDebounce } from '@/hooks/useDebounce'

import './style.css'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import { LoadingSpinnerIcon } from 'packages/ui-components/src/components/Loading/Icon'


const ResponsiveGridLayout = WidthProvider(Responsive)

export default function DboardComponentList() {
  const { components, setComponents } = useOverviewContext()
  const [currentLayout, setCurrentLayout] = useState<Layout[]>([])
  const [status, setStatus] = useState<'saving' | 'saved' | null>(null)

  const layout = components.map(component => ({
    i: component.id,
    x: component.x ?? 0,
    y: component.y ?? 0,
    w: component.width ?? 3,
    h: component.height ?? 1
  }))

  const handleLayoutChange = (newLayout: Layout[]) => {
    console.log('called layout changed')
    setCurrentLayout(newLayout)
  }

  useDebounce(() => {
    handleSaveLayout()
  }, [currentLayout])

  const handleSaveLayout = async () => {
    setStatus('saving')
    try {
      const updatedComponents = components.map(component => {
        const layoutItem = currentLayout.find(item => item.i === component.id)
        if (layoutItem) {
          return {
            ...component,
            x: layoutItem.x || 0,
            y: layoutItem.y || 0,
            width: layoutItem.w || 2,
            height: layoutItem.h || 1
          }
        }
        return component
      })

      await dboardUpdateLayout(updatedComponents as unknown as IUpdateLayoutComponent[])
      setComponents(updatedComponents)
      setStatus('saved')
    } catch (error) {
      setStatus(null)
      messageError('Failed to save layout')
      console.error('Failed to save layout:', error)
    }
  }

  return (
    <div className="space-y-2 dashboard-component-list">
      <div className="flex justify-between items-center px-[10px]">
        <DashboardComponentCreate />
        <div className='flex items-center py-2 px-3 border border-dashed bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md'>
          {status === 'saved' ? <div className='flex items-center gap-2'>
            <span className='text-xs'>Saved</span>
            <HiOutlineCheckCircle className='w-4 h-4 text-green-500' />
          </div>
            : null}

          {status === 'saving' ?
            <div className='flex items-center gap-2'>
              <span className='text-xs'>Saving</span>
              <div className='w-4 h-4'>
                <LoadingSpinnerIcon />
              </div>
            </div>
            : null}
        </div>
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
        draggableHandle=".drag-handle"
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
