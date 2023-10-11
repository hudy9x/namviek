'use client'

import { useProjectWidget } from '@/store/widget'
import { Button } from '@shared/ui'
import { AiOutlinePlus } from 'react-icons/ai'

export const MyWidgetCreate = () => {
  const { addWidget } = useProjectWidget()
  return (
    <div className='absolute right-0 bottom-0 z-50 m-5'>
      <Button
        primary
        leadingIcon={<AiOutlinePlus />}
        title='Create widget'
        className='fixed-craete-btn'
        onClick={() => addWidget()}
      />
    </div>
  )
}