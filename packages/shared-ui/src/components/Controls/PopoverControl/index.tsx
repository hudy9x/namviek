import React, { SetStateAction } from 'react';
import * as Popover from '@radix-ui/react-popover';

interface PopoverControl {
  triggerBy: React.ReactNode;
  content: React.ReactNode;
}

const PopoverControl = ({
  triggerBy,
  content,
}: PopoverControl) => {
  return (
    <Popover.Root>
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
