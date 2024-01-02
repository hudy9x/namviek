import { projectView } from "@/services/projectView";
import { useProjectViewStore } from "@/store/projectView";
import { Button, Form, messageError, messageSuccess } from "@shared/ui";
import { useState } from "react";
import ProjectViewIcon from "./ProjectViewIcon";
import { ProjectViewType } from "@prisma/client";

export default function ProjectViewChangeName({ name, id, type, hideModal }: { name: string, id: string, type: ProjectViewType, hideModal: () => void }) {
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
    <p className="text-gray-500 text-sm">{`Personalize your tab's name. By the way, names are independent, so duplicates are welcome.`}</p>
    <Form.Input onEnter={onChange} value={newName} onChange={(ev) => setNewName(ev.target.value)} />
    <div className="text-right">
      <Button title="Just do it" primary onClick={onChange} />
    </div>
  </div>
}
