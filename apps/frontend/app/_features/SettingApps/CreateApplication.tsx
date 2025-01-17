'use client'

import { useGetParams } from '@/hooks/useGetParams'
import { useApplicationStore } from '@/store/application'
import { Button, Dialog, Form, messageError } from '@ui-components'
import { useState } from 'react'

export default function CreateApplication() {
  const { addApplication, isLoading } = useApplicationStore()
  const { orgId } = useGetParams()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const onAdd = async () => {
    if (!name || !orgId) {
      messageError('Name and Organization are required')
      return
    }

    await addApplication({
      name,
      orgId,
      desc
    })

    setOpen(false)
    setName('')
    setDesc('')
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div>
          <Button
            primary
            title="Create Application"
          />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          <div className='space-y-3'>
            <h2>Create new application</h2>

            <Form.Input title='Name' required value={name} onChange={ev => setName(ev.target.value)} />
            <Form.Textarea title='Description' value={desc} onChange={ev => setDesc(ev.target.value)} />
            <div>
              <Button loading={isLoading} primary onClick={onAdd} title='Create' block />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 
