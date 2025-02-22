'use client'

import { Button, Dialog } from '@ui-components'
import { useState, useEffect } from 'react'
import { HiPlus, HiXMark } from 'react-icons/hi2'
import { webhookSv } from '@/services/webhook'
import { GridWebhook } from '@prisma/client'
import { useParams } from 'next/navigation'
import { WebhookList } from './WebhookList'
import { CreateWebhookForm } from './CreateWebhookForm'

interface WebhookManagerProps {
  open: boolean
  onClose: () => void
}

export default function WebhookManager({ open, onClose }: WebhookManagerProps) {
  const params = useParams()
  const gridCollectionId = params.gridId as string
  
  const [webhooks, setWebhooks] = useState<GridWebhook[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingWebhooks, setIsLoadingWebhooks] = useState(false)

  useEffect(() => {
    if (open) {
      loadWebhooks()
    }
  }, [open, gridCollectionId])

  const handleCreate = async (data: { url: string; secret: string; events: string[] }) => {
    setIsLoading(true)
    try {
      await webhookSv.create({
        gridCollectionId,
        ...data
      })
      
      await loadWebhooks()
      setIsCreateOpen(false)
    } catch (error) {
      console.error('Failed to create webhook:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await webhookSv.delete(id)
      await loadWebhooks()
    } catch (error) {
      console.error('Failed to delete webhook:', error)
    }
  }

  const loadWebhooks = async () => {
    setIsLoadingWebhooks(true)
    try {
      const response = await webhookSv.getByGridCollection(gridCollectionId)
      setWebhooks(response.data.data)
    } catch (error) {
      console.error('Failed to load webhooks:', error)
    } finally {
      setIsLoadingWebhooks(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="max-w-2xl">
        <div className="">
        
          {/* Webhooks List */}
          <WebhookList 
            webhooks={webhooks} 
            onDelete={handleDelete}
            onAdd={() => setIsCreateOpen(true)}
            isHidden={isCreateOpen}
            isLoading={isLoadingWebhooks}
          />

          {/* Create Webhook Panel */}
          <div 
            className={`
             bg-white dark:bg-gray-900 mt-0
              transform transition-transform duration-300 ease-in-out
              ${isCreateOpen ? 'block' : 'hidden'}
            `}
          >
            <div className="h-full flex flex-col pb-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Create new webhook</h3>
              </div>

              <div className="flex-1 overflow-y-auto">
                <CreateWebhookForm 
                  onSubmit={handleCreate}
                  onCancel={() => setIsCreateOpen(false)}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Overlay when create panel is open */}
          {/* {isCreateOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={() => setIsCreateOpen(false)}
            />
          )} */}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
} 