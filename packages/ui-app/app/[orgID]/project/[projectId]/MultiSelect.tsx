import { Form, ListItemValue } from '@shared/ui';
import { useFormik } from 'formik';
import { useState } from 'react';

const List = Form.List;

const options: ListItemValue[] = [
  { id: 'VN', title: 'Viet Nam' },
  { id: 'US', title: 'United State' },
  { id: 'JP', title: 'Japan' },
  { id: 'JP1', title: 'Japan1' },
  { id: 'JP2', title: 'Japan2' },
  { id: 'JP3', title: 'Japan3' },
  { id: 'JP4', title: 'Japan4' },
  { id: 'JP5', title: 'Japan5' },
  { id: 'JP6', title: 'Japan6' },
  { id: 'JP7', title: 'Japan7' },
  { id: 'JP8', title: 'Japan8' },
  { id: 'JP9', title: 'Japan9' }
];

export default function MultiSelect() {
  const formik = useFormik({
    initialValues: {
      country: ''
    },
    onSubmit: values => {
      console.log(values);
    }
  });

  const [val, setVal] = useState([options[0], options[1]]);

  return (
    <div>
      <List
        multiple
        value={val}
        onMultiChange={setVal}
        name="country"
        onFormikChange={formik.setFieldValue}
        helper="You must select your country"
        required
        title="Country"
        placeholder="Select your country">
        <List.Button>
          {val.map(v => {
            return (
              <div className="selected-item" key={v.id}>
                {v.title}
              </div>
            );
          })}
        </List.Button>
        <List.Options>
          {options.map(option => {
            return (
              <List.Item key={option.id} value={option}>
                {option.title}
              </List.Item>
            );
          })}
        </List.Options>
      </List>
    </div>
  );
}
