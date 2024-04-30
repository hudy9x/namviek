import { ReactNode } from "react";

export default function DialogTitle({ children }: { children?: ReactNode }) {

  if (!children) return null

  return <h2 className="dialog-title">{children}</h2>

}
