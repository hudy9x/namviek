'use client'

import { Button } from '@ui-components'
import { useState } from 'react'
import WebhookManager from './WebhookManager'
import { HiOutlineGlobeAlt } from 'react-icons/hi2'

export default function GridWebhooks() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button 
        title="Webhooks" 
        leadingIcon={<HiOutlineGlobeAlt />}
        onClick={() => setIsOpen(true)} 
      />
      
      <WebhookManager 
        open={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
} 