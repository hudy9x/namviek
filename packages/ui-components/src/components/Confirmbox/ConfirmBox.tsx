import { useEffect, useState } from 'react'
import { Root } from 'react-dom/client'
import { getConfirmIcons } from './Icons'
import { ConfirmAction, ConfirmboxType } from './type'
import Button from '../Button'

interface Props {
  type: ConfirmboxType
  action: ConfirmAction
  root: Root
  container: HTMLDivElement
}

export default function ConfirmBox({ type, action, root, container }: Props) {
  const [visible, setVisible] = useState(true)
  const { message, title, yes, no } = action

  const close = () => {
    container.style.display = 'none'
    setVisible(false)

    setTimeout(() => {
      root.unmount()
      container.remove()
    }, 1000)
  }

  const onOk = () => {
    yes()
    close()
  }

  const onCancel = () => {
    no && no()
    close()
  }

  useEffect(() => {
    const clickOutsideHandler = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement

      if (
        target.classList.contains('confirmbox') ||
        target.closest('.confirmbox')
      ) {
        return
      }

      close()
    }

    container.addEventListener('click', clickOutsideHandler)

    return () => {
      container.removeEventListener('click', clickOutsideHandler)
    }
  })

  return (
    <div className={`confirmbox ${type} ${visible ? '' : 'hidden'}`}>
      {getConfirmIcons(type)}
      {title ? <h2 className="text-lg font-bold mb-2">{title}</h2> : null}
      <p>{message}</p>
      <div className="confirm-actions grid grid-cols-2 gap-4 w-full">
        <Button title="Yes" onClick={onOk} primary />
        <Button title="No" onClick={onCancel} />
      </div>
    </div>
  )
}
