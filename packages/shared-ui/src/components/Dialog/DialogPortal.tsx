import { ReactNode } from "react"
import { createPortal } from "react-dom";

function createDialogContainer(containerId: string) {
  const container = document.createElement('div')
  container.id = containerId

  document.body.append(container)

  return container
}

function getDialogContainer(): HTMLDivElement {
  const containerId = 'dialog-container'
  let containerElement = document.getElementById(containerId) as HTMLDivElement

  if (!containerElement) {
    containerElement = createDialogContainer(containerId)
  }

  return containerElement
}

export default function DialogPortal({ children }: { children: ReactNode }) {
  const container = getDialogContainer()
  return createPortal(children, container)
}
