import * as Dialog from '@radix-ui/react-dialog'
import { MdClose } from 'react-icons/md'
import './styles.css'
import { SetStateAction, useEffect, useState } from 'react'

interface ModalProps {
  triggerBy: React.ReactNode
  title: string
  desc?: string
  visible?: boolean
  onVisibleChange?: React.Dispatch<SetStateAction<boolean>>
  content: React.ReactNode
  backdrop?: boolean
  className?: string
}

export default function Modal({
  triggerBy,
  visible = false,
  onVisibleChange,
  title,
  desc,
  content,
  backdrop = true,
  className
}: ModalProps) {
  return (
    <Dialog.Root open={visible} onOpenChange={onVisibleChange}>
      <Dialog.Trigger asChild>{triggerBy}</Dialog.Trigger>
      <Dialog.Portal>
        <div className="fixed top-0 left-0 w-screen h-screen z-20">
          <div className="relative w-full h-full flex items-center justify-center">
            <Dialog.Content className={`modal-content ${className}`}>
              {title ? (
                <Dialog.Title className="modal-title">{title}</Dialog.Title>
              ) : null}
              {desc ? (
                <Dialog.Description className="modal-desc">
                  {desc}
                </Dialog.Description>
              ) : null}

              {content}

              <Dialog.Close asChild>
                <button className="modal-close" aria-label="Close">
                  <MdClose />
                </button>
              </Dialog.Close>
            </Dialog.Content>
            {backdrop ? <Dialog.Overlay className="modal-overlay" /> : null}
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

Modal.Close = Dialog.Close
