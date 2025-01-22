
import { useProjectViewContext } from './context'
import IconSelect from '@/components/IconSelect'

export default function ProjectViewTitle({ iconName }: { iconName: string }) {
  const { name, setName, setIcon } = useProjectViewContext()

  return (
    <div className="view-name-input">
      <IconSelect value={iconName} onChange={val => {
        console.log(val)
        setIcon(val)
      }} />
      <input
        value={name}
        onChange={ev => setName(ev.target.value)}
        placeholder="View name here ..."
        className="text-sm"
      />
    </div>
  )
}
