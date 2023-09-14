import * as Dialog from '@radix-ui/react-dialog'
import { MdClose } from 'react-icons/md'
import './styles.css'
import { SetStateAction, useEffect, useState } from 'react'

interface ModalProps {
  triggerBy: React.ReactNode
  title: string
  desc?: string
  size?: 'sm' | 'base' | 'lg' | 'xl'
  visible?: boolean
  onVisibleChange?: React.Dispatch<SetStateAction<boolean>>
  content: React.ReactNode
  backdrop?: boolean
  className?: string
  closeBtn?: boolean
}

export default function Modal({
  triggerBy,
  visible = false,
  onVisibleChange,
  title,
  desc,
  size = 'base',
  content,
  backdrop = true,
  closeBtn = true,
  className
}: ModalProps) {
  const classes = [className]
  size && classes.push(`modal-size-${size}`)

  return (
    <Dialog.Root open={visible} onOpenChange={onVisibleChange}>
      <Dialog.Trigger asChild>{triggerBy}</Dialog.Trigger>
      <Dialog.Portal>
        <div className="fixed top-0 left-0 w-screen h-screen z-20">
          <div className="relative w-full h-full flex items-center justify-center">
            <Dialog.Content
              className={`modal-content ${classes.filter(Boolean).join(' ')}`}>
              {title ? (
                <Dialog.Title className="modal-title">{title}</Dialog.Title>
              ) : null}
              {desc ? (
                <Dialog.Description className="modal-desc">
                  {desc}
                </Dialog.Description>
              ) : null}

              {content}

              {closeBtn ? (
                <Dialog.Close asChild>
                  <button className="modal-close" aria-label="Close">
                    <MdClose />
                  </button>
                </Dialog.Close>
              ) : null}
            </Dialog.Content>
            {backdrop ? <Dialog.Overlay className="modal-overlay" /> : null}
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

Modal.Close = Dialog.Close
