import { Form, ListItemValue } from '@shared/ui'
import { useState } from 'react'
const List = Form.List
const operators: ListItemValue[] = [
  { id: '=', title: '=' },
  { id: '>=', title: '>=' },
  { id: '>', title: '>' },
  { id: '<=', title: '<=' },
  { id: '<', title: '<' },
  { id: '!=', title: '!=' }
]

interface IOperatorSelectProps {
  title?: string
  value?: string
  className?: string
  onChange?: (val: string) => void
}
export default function OperatorSelect({
  title,
  className,
  value,
  onChange
}: IOperatorSelectProps) {
  const [val, setval] = useState(operators[0])
  return (
    <div className={className}>
      <List
        title={title}
        value={val}
        onChange={val => {
          setval(val)
        }}>
        <List.Button>{val.title}</List.Button>
        <List.Options>
          {operators.map(op => {
            return (
              <List.Item key={op.id} value={op}>
                {op.title}
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}
