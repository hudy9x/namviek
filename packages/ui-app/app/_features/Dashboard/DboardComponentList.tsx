import { useOverviewContext } from '../Project/Overview/context'
import DbComponent from './components/DbComponent'

export default function DboardComponentList() {
  const { components } = useOverviewContext()
  return (
    <div className="grid grid-cols-4 gap-3">
      {components.map(component => {
        // if (component.id !== '64c8e95873337080d570675f') return null
        return <DbComponent component={component} key={component.id} />
      })}
    </div>
  )
}
