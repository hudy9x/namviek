import { Button, Form, randomId } from "@shared/ui";
import { useReportSavedListContext } from "./context";
import { useState } from "react";
import { useReportContext } from "../Report/context";

export default function AddToSavedList() {
  const { getSavedConfig } = useReportContext()
  const { addItem } = useReportSavedListContext()
  const [title, setTitle] = useState('')

  return <div className="flex items-center gap-2">
    <Form.Input size="sm" placeholder="Report name" value={title} onChange={v => setTitle(v.target.value)} />
    <Button title="Save" size="sm" onClick={() => {
      addItem({
        id: randomId(),
        title,
        createdAt: new Date(),
        data: getSavedConfig()
      })
    }} primary />
  </div>
}
