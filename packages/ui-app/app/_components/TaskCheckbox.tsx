import { Form } from '@shared/ui';
import { useState } from 'react';
export default function TaskCheckbox({ id }: { id: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <Form.Checkbox
      checked={checked}
      onChange={val => {
        setChecked(val);
        console.log(val);
      }}
    />
  );
}
