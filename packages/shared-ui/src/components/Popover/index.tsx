import * as Popover from '@radix-ui/react-popover';
import './style.css';
export default function PopoverContainer() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="popover-icon" aria-label="Update dimensions">
          X
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="popover-content" sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>heheheheheh</div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
