import { Button, Modal } from '@shared/ui'
import { useState } from 'react'
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2'
import PromptContainer from './PromptContainer'

export default function PromptGenerator() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Prompt generator"
        size="xl"
        triggerBy={
          <div>
            <Button
              leadingIcon={<HiOutlineChatBubbleLeftEllipsis />}
              title="Prompt generator"
            />
          </div>
        }
        content={<PromptContainer />}
      />
    </div>
  )
}
