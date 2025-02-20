'use client'

import { useGetParams } from '@/hooks/useGetParams'
import { useApplicationStore } from '@/store/application'
import { Button, Dialog, Form, messageError, randomId } from '@ui-components'
import { useState } from 'react'
import { APPLICATION_SCOPES } from '@namviek/core/permission'

export default function CreateApplication() {
  const { addApplication, isLoading } = useApplicationStore()
  const { orgId } = useGetParams()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [selectedScopes, setSelectedScopes] = useState<string[]>([])

  const onAdd = async () => {
    if (!name || !orgId) {
      messageError('Name and Organization are required')
      return
    }

    await addApplication({
      name,
      orgId,
      desc,
      scopes: selectedScopes
    })

    setOpen(false)
    setName('')
    setDesc('')
    setSelectedScopes([])
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div>
          <Button title="Create Application" />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          <div className='space-y-3'>
            <h2>Create new application</h2>

            <Form.Input
              title='Name'
              required
              value={name}
              onChange={ev => setName(ev.target.value)}
            />
            <Form.Textarea
              title='Description'
              value={desc}
              onChange={ev => setDesc(ev.target.value)}
            />

            {/* Scope Selection */}
            <div className="space-y-4">
              {Object.entries(APPLICATION_SCOPES).map(([key, group]) => (
                <div key={key} className="space-y-2">
                  <h3 className="text-xs text-gray-200 uppercase bg-indigo-50/60 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-200">
                    {group.label}
                  </h3>
                  <section className="space-y-1">
                    {group.scopes.map(scope => {
                      const id = randomId()

                      return <label htmlFor={id} className='px-3 text-gray-500 hover:bg-gray-50 rounded-md hover:cursor-pointer flex items-center py-1 justify-between' key={scope.value}>
                        <div className='text-sm'>{scope.label}</div>
                        <Form.Checkbox
                          uid={id}
                          checked={selectedScopes.includes(scope.value)}
                          onChange={(checked) => {
                            setSelectedScopes(prev =>
                              checked
                                ? [...prev, scope.value]
                                : prev.filter(s => s !== scope.value)
                            )
                          }}
                        />
                      </label>
                    })}
                  </section>
                </div>
              ))}
            </div>

            <div>
              <Button
                loading={isLoading}
                primary
                onClick={onAdd}
                title='Create'
                block
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 
