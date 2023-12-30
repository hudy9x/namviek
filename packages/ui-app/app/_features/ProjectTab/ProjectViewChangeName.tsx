import { projectView } from "@/services/projectView";
import { useProjectViewStore } from "@/store/projectView";
import { Button, Form, messageError, messageSuccess } from "@shared/ui";
import { useState } from "react";

export default function ProjectViewChangeName({ name, id, hideModal }: { name: string, id: string, hideModal: () => void }) {
  const [newName, setNewName] = useState(name)

  const { updateView } = useProjectViewStore()

  const onChange = () => {

    if (!newName) return

    updateView(id, {
      name: newName
    })

    hideModal()

    projectView.update({
      id,
      name: newName
    }).then(res => {
      console.log(res)
      messageSuccess('Rename successfully')


    }).catch(err => {
      console.log(err)
      messageError("Rename tab error !")
    })
  }

  return <div className="space-y-3">
    <Form.Input onEnter={onChange} value={newName} onChange={(ev) => setNewName(ev.target.value)} />
    <div className="text-right">
      <Button title="Change tab's name" primary onClick={onChange} />
    </div>
  </div>
}
