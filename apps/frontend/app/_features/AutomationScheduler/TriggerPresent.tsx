import { Button } from "@shared/ui"
import { useSchedulerContext } from "./context"
import { HiOutlineTrash, HiOutlineXCircle } from "react-icons/hi2"

export default function TriggerPresent() {
  const { trigger, setTrigger } = useSchedulerContext()
  const { every, at } = trigger
  const clearTrigger = () => {
    setTrigger({ every: '' })
  }
  return <section className="space-y-3">
    <div className="box-2 text-sm">
      <p>
        Trigger below action every {every} at {[at?.hour, at?.minute, at?.period].filter(Boolean).join('.')}
      </p>
      <Button onClick={clearTrigger} leadingIcon={<HiOutlineTrash />} />
    </div>
  </section>
}
