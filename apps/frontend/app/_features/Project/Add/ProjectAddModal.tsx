'use client'

import { Dialog, Modal } from '@shared/ui'
import { useState, ReactNode } from 'react'
import ProjectAddForm from './ProjectAddForm'

export default function ProjectAddModal({
  triggerComponent
}: {
  triggerComponent: ReactNode
}) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Dialog.Root open={visible} onOpenChange={setVisible}>
        <Dialog.Trigger>
          {triggerComponent}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content>
            <Dialog.Title>Create new project</Dialog.Title>
            <ProjectAddForm setVisible={setVisible} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {/* <Modal */}
      {/*   visible={visible} */}
      {/*   onVisibleChange={setVisible} */}
      {/*   title="Create new project" */}
      {/*   triggerBy={triggerComponent} */}
      {/*   content={<ProjectAddForm setVisible={setVisible} />} */}
      {/* /> */}
    </>
  )
}
