import { DatePickerBorderless } from '@shared/ui';
import { useState } from 'react';

export default function TaskDate({ date, taskId }: { date: Date | null; taskId: string }) {
  const [value, setValue] = useState(date);

  if (!value) {
    return <div>-</div>;
  }

  return (
    <div className="task-date">
      <DatePickerBorderless value={value} />
    </div>
  );
}
