import React, { SetStateAction } from 'react';
import * as Popover from '@radix-ui/react-popover';
import './styles.css';

interface PopoverControl {
  triggerBy: React.ReactNode;
  visible?: boolean;
  onVisibleChange?: React.Dispatch<SetStateAction<boolean>>;
  content: React.ReactNode;
}

export const Popover = ({
  triggerBy,
  visible = false,
  onVisibleChange,
  content,
}: PopoverControl) => {
  return (
    <Popover.Root open={visible} onOpenChange={onVisibleChange}>
      <Popover.Trigger asChild>{triggerBy}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent">
          <div>{content}</div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}