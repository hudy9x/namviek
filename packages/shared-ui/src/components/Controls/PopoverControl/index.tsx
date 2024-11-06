import React, { SetStateAction } from 'react';
import * as Popover from '@radix-ui/react-popover';

interface PopoverControl {
  align?: 'center' | 'start' | 'end'
  alignOffset?: number;
  sideOffset?: number;
  triggerBy: React.ReactNode;
  content: React.ReactNode;
}

const PopoverControl = ({
  align = 'center',
  alignOffset = 0, sideOffset = 0,
  triggerBy,
  content,
}: PopoverControl) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{triggerBy}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side='top'
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          align={align}>
          <div>{content}</div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default PopoverControl
