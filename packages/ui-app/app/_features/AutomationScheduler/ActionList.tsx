import { Button, Form, FormGroup } from "@shared/ui";
import { useState } from "react";
import { HiOutlineBell, HiOutlineSquare2Stack } from "react-icons/hi2";
import { useSchedulerContext } from "./context";
import { schedulerService } from "@/services/scheduler";
import { useParams } from "next/navigation";

export default function ActionList() {
  const { orgID, projectId } = useParams()
  const { trigger } = useSchedulerContext()
  const [content, setContent] = useState({
    title: '',
    content: ''
  })

  const onCreate = () => {

    schedulerService.create({
      organizationId: orgID,
      projectId,
      trigger,
      action: {
        group: 'notification',
        config: {
          title: content.title,
          content: content.content
        }
      }
    })
  }

  return <div className="space-y-3">
    <div>
      <FormGroup title="">
        <Button leadingIcon={<HiOutlineBell />} />
        <Button leadingIcon={<HiOutlineSquare2Stack />} />
      </FormGroup>
    </div>
    <div className="box-2">
      <div className="space-y-3 w-full py-2">
        <Form.Input title="Title"
          value={content.title}
          onChange={ev => setContent(prev => {
            return { ...prev, title: ev.target.value }
          })}
          className="w-[250px]" />
        <Form.Textarea
          value={content.content}
          onChange={ev => setContent(prev => {
            return { ...prev, content: ev.target.value }
          })}
          title="Content" />
      </div>


    </div>
    <section className="mt-3 text-right">
      <Button primary onClick={onCreate} title="Create scheduled automation" />
    </section>
  </div>
}
