import { Form } from '@shared/ui';
import { useState } from 'react';

export default function TaskCheckAll() {
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
