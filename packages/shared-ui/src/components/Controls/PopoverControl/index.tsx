import React, { SetStateAction } from 'react';
import * as Popover from '@radix-ui/react-popover';

interface PopoverControl {
  triggerBy: React.ReactNode;
  visible?: boolean;
  onVisibleChange?: React.Dispatch<SetStateAction<boolean>>;
  content: React.ReactNode;
}

const PopoverControl = ({
  triggerBy,
  visible = false,
  onVisibleChange,
  content,
}: PopoverControl) => {
  return (
    <Popover.Root open={visible} onOpenChange={onVisibleChange}>
      <Popover.Trigger asChild>{triggerBy}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <div>{content}</div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default PopoverControl
