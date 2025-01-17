## Dialog

```tsx
// You need to import it first
import { Dialog } from '@ui-components'

// How to use it
const MyDialog = () => {
  const [open, setOpen] = useState(false)

  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger>
      {/* You can use any element as a trigger */}
      <button>Open Dialog</button>
    </Dialog.Trigger>

    {/* Portal is used to render the dialog content outside the parent element
    So its required to use it
     */}
    <Dialog.Portal>
      {/* Dialog content, you can customize the size */}
      <Dialog.Content size="sm">
        {/* You can use any React element as a content */}
        <h1>My Dialog</h1>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
```

## Button
```tsx
// You need to import it first
import { Button } from '@ui-components'

// How to use it
const MyButton = () => {
  return <>
    {/* You can use title or leadingIcon */}
    <Button title="My Button" />
    <Button leadingIcon={<FiPlus} />

    {/* You can customize the size */}
    <Button size="sm" />
    <Button size="lg" />

    {/* You can customize the type */}
    <Button type="button" />
    <Button type="submit" />
    <Button type="reset" />

    {/* You can customize the block */}
    <Button block />    

    {/* You can customize the primary, danger, ghost */}
    <Button primary />
    <Button danger />
    <Button ghost />

    {/* You can customize the loading */}
    <Button loading />

    {/* You can customize the disabled */}
    <Button disabled />

    {/* You can customize the className */}
    <Button className="bg-red-500" />
  </>
}
```

## Card
```tsx
// You need to import it first
import { Card } from '@ui-components'

// How to use it
const MyCard = () => {
  return <Card />
}
```

## Input  
```tsx
// You need to import it first
import { Form } from '@ui-components'

// How to use it
const MyInput = () => {
  return <>
    <Form.Input name="name" title="Name" />
    <Form.Input name="email" title="Email" />
    <Form.Input name="password" title="Password" />
    <Form.Input name="confirmPassword" title="Confirm Password" />  

    {/* You can customize the size */}
    <Form.Input name="name" title="Name" size="sm" />
    <Form.Input name="name" title="Name" size="lg" /> 

    {/* You can customize the type */}
    <Form.Input name="name" title="Name" type="text" />
    <Form.Input name="name" title="Name" type="email" />
    <Form.Input name="name" title="Name" type="password" />

    {/* You can customize the placeholder */}
    <Form.Input name="name" title="Name" placeholder="Enter your name" />

    {/* You can customize the disabled */}
    <Form.Input name="name" title="Name" disabled />

    {/* You can customize the className */}
    <Form.Input name="name" title="Name" className="bg-red-500" />

    {/* You can customize the error */}
    <Form.Input name="name" title="Name" error="Name is required" />
  </>

}
```

## Select
```tsx
// You need to import it first
import { Form } from '@ui-components'

// How to use it
const MySelect = () => {
  return <Form.Select name="name" title="Name" />
}
```