import { createRoot } from "react-dom/client"
import { ConfirmFunc, CreateConfirmFunc } from "./type"
import ConfirmBox from "./ConfirmBox"
import "./style.css"

const createContainer = () => {
  let confirmWrapper = document.querySelector('#confirm-wrapper')

  if (!confirmWrapper) {
    confirmWrapper = document.createElement('div')
    confirmWrapper.id = 'confirm-wrapper'

    document.body.appendChild(confirmWrapper)
  }

  const container = document.createElement('div')
  container.className = "confirm-container"

  confirmWrapper.appendChild(container)

  return container
}

const createConfirm: CreateConfirmFunc = (type, action) => {
  const container = createContainer();
  const root = createRoot(container)

  root.render(<ConfirmBox {...{type, action, root, container}} />)

}

export const confirmAlert: ConfirmFunc = (action) => {
  createConfirm("alert", action)
}
export const confirmWarning: ConfirmFunc = (action) => {
  createConfirm("warning", action)
}

