import { ReactNode } from "react"

export const SIDEBAR_WIDTH = 308;

export const BoardContainer = ({ children }: {
  children: ReactNode
}) => {
  return (
    <div className="h-full overflow-auto pt-4 pl-9 flex" style={{ width: `calc(100vw - ${SIDEBAR_WIDTH}px)` }}>
      {children}
    </div>
  )
}
