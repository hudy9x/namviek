import { Button, FormGroup } from '@shared/ui'
import { HiOutlineCalendar, HiOutlineViewColumns } from 'react-icons/hi2'
import { EVisionViewMode, useVisionContext } from './context'

export default function VisionViewMode() {
  const { mode, setMode } = useVisionContext()
  return (
    <FormGroup>
      <Button
        disabled={mode === EVisionViewMode.TIMELINE}
        onClick={() => setMode(EVisionViewMode.TIMELINE)}
        leadingIcon={<HiOutlineViewColumns />}
      />
      <Button
        disabled={mode === EVisionViewMode.CALENDAR}
        onClick={() => setMode(EVisionViewMode.CALENDAR)}
        leadingIcon={<HiOutlineCalendar />}
      />
    </FormGroup>
  )
}
