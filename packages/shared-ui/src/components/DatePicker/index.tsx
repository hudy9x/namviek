import { format } from 'date-fns';
import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { AiOutlineCalendar } from 'react-icons/ai';
import 'react-day-picker/dist/style.css';
import './style.css';

export default function DatePicker() {
  const [selected, setSelected] = useState<Date>();
  const [visible, setVisible] = useState(false);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }

  return (
    <div className="form-control">
      <label>Due date</label>
      <div className="form-control-wrapper relative">
        <Popover.Root open={visible} onOpenChange={setVisible}>
          <Popover.Trigger asChild>
            <div>
              <div className="form-input" tabIndex={-1}>
                {selected ? format(selected, 'PP') : 'Select date'}
              </div>
              <AiOutlineCalendar className="absolute top-2.5 right-2.5 text-gray-400" />
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content sideOffset={4} className="popover-content">
              <DayPicker
                mode="single"
                selected={selected}
                showOutsideDays
                fixedWeeks
                onSelect={value => {
                  setVisible(false);
                  setSelected(value);
                }}
              />
              {/* <Popover.Arrow className="popover-arrow" /> */}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}
