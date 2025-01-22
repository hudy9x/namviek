import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ListPortal({ children }: { children: ReactNode }) {
  return createPortal(<div className="select-option-container">{children}</div>, document.body)
}
