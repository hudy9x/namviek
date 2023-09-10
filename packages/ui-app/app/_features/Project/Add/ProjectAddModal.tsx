'use client'

import { Modal } from '@shared/ui'
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
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Create new project"
        triggerBy={triggerComponent}
        content={<ProjectAddForm setVisible={setVisible} />}
      />
    </>
  )
}
