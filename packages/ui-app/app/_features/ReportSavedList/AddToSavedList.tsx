import { Button, Form, randomId } from "@shared/ui";
import { useReportSavedListContext } from "./context";
import { useState } from "react";
import { useReportContext } from "../Report/context";

export default function AddToSavedList() {
  const { getSavedConfig } = useReportContext()
  const { addItem } = useReportSavedListContext()
  const [title, setTitle] = useState('')

  const addAction = () => {
    addItem({
      id: randomId(),
      title,
      createdAt: new Date(),
      data: getSavedConfig()
    })

    setTitle('')
  }

  return <div className="flex items-center gap-2">
    <Form.Input size="sm" onEnter={() => {
      addAction()
    }} placeholder="Report name" value={title} onChange={v => setTitle(v.target.value)} />
    <Button title="Save" size="sm" onClick={() => {
      addAction()
    }} primary />
  </div>
}
