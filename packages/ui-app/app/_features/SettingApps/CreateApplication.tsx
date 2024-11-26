'use client'

import { useGetParams } from '@/hooks/useGetParams'
import { applicationSv } from '@/services/apps'
import { useApplicationStore } from '@/store/application'
import { Button, Dialog, Form, messageError, messageSuccess } from '@shared/ui'
import { useState } from 'react'

export default function CreateApplication() {
  const addApplication = useApplicationStore(state => state.addApplication)
  const { orgId } = useGetParams()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const onAdd = () => {
    if (!name || !orgId) {
      messageError('Name and Organization are required')
      return
    }

    addApplication({
      name,
      orgId,
      desc
    })

    // applicationSv.create({
    //   name,
    //   orgId,
    //   desc
    // }).then(res => {
    //   console.log(res)
    //   const { data, status } = res.data
    //   if (status !== 200) {
    //     messageError('Failed to create application')
    //     return
    //   }
    //   messageSuccess('Application created successfully')
    //   setOpen(false)
    //   addApplication(data)
    // })
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
              <Button primary onClick={onAdd} title='Create' block />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 
