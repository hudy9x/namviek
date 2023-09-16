import { Form } from '@shared/ui'
import { useCallback, useEffect, useState } from 'react'
export default function TaskCheckbox({
  id,
  checked
}: {
  id: string
  checked: boolean
}) {
  return <Form.Checkbox checked={checked} />
}
