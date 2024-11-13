import { Form, randomId } from "@shared/ui";

export default function CustomFieldCheckboxAll() {
  const id = randomId()
  return <label htmlFor={id} className="list-cell">
    <Form.Checkbox size="lg" uid={id} />
  </label>
}
