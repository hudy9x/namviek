import { Button, Form, FormGroup } from '@shared/ui'
import { useState } from 'react'
import { HiOutlineBell, HiOutlineSquare2Stack } from 'react-icons/hi2'
import { useSchedulerContext } from './context'
import { schedulerService } from '@/services/scheduler'
import { useParams } from 'next/navigation'
import MultiMemberPicker from '@/components/MultiMemberPicker'
import { useGetParams } from '@/hooks/useGetParams'

export default function ActionList({ back }: { back: () => void }) {
  const { projectId } = useParams()
  const { orgId } = useGetParams()
  const { trigger } = useSchedulerContext()
  const [content, setContent] = useState({
    title: '',
    content: '',
    to: ['ALL']
  })

  const onCreate = () => {
    if (!orgId) return

    schedulerService
      .create({
        organizationId: orgId,
        projectId,
        trigger,
        action: {
          group: 'notification',
          config: {
            title: content.title,
            content: content.content,
            to: content.to
          }
        }
      })
      .then(res => {
        back()
      })
  }

  return (
    <div className="space-y-3">
      <div>
        <FormGroup title="">
          <Button leadingIcon={<HiOutlineBell />} />
          <Button leadingIcon={<HiOutlineSquare2Stack />} />
        </FormGroup>
      </div>
      <div className="box-2">
        <div className="space-y-3 w-full py-2">
          <Form.Input
            title="Title"
            value={content.title}
            onChange={ev =>
              setContent(prev => {
                return { ...prev, title: ev.target.value }
              })
            }
            className="w-[250px]"
          />
          <MultiMemberPicker
            title="Notify to users"
            all={true}
            value={content.to}
            onChange={val => {
              setContent(prev => {
                return { ...prev, to: val }
              })
              // setFilterValue('assigneeIds', val)
            }}
            compact={true}
            className="task-filter-member-picker"
          />
          <Form.Textarea
            value={content.content}
            onChange={ev =>
              setContent(prev => {
                return { ...prev, content: ev.target.value }
              })
            }
            title="Content"
          />
        </div>
      </div>
      <section className="mt-3 text-right">
        <Button
          primary
          onClick={onCreate}
          title="Create scheduled automation"
        />
      </section>
    </div>
  )
}
