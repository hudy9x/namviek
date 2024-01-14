import { Profiler, ReactNode } from "react"

export default function ProfileTracker({ children, id }: { children: ReactNode, id: string }) {

  const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    // Aggregate or log render timings...
    console.log(id, phase, actualDuration, baseDuration, startTime)
  }

  return <Profiler id={id} onRender={onRender}>{children}</Profiler>
}
