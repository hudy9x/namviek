import { Button, DatePicker, Form, Tab, messageWarning } from '@shared/ui'
import MemberPicker from '@/components/MemberPicker'
import PrioritySelect from '@/components/PrioritySelect'
import StatusSelect from '@/components/StatusSelect'
import { TaskPriority, TaskStatus, TaskType } from '@prisma/client'
import { useFormik } from 'formik'
import { validateTask } from '@shared/validation'
import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useProjectStatusStore } from '@/store/status'
import FileControl from '@/components/FileKits/FileControl'
import Activity from '@/features/Activity'
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChatBubbleLeft,
  HiOutlineClock,
  HiOutlineFlag,
  HiOutlineMap,
  HiOutlinePaperClip,
  HiOutlineSquare2Stack,
  HiOutlineUser
} from 'react-icons/hi2'
import './style.css'
import TaskCover from './TaskCover'
import TaskComments from '../TaskComments'
import TaskDescUpdate from './TaskDescUpdate'
import TaskTypeSelect from '@/components/TaskTypeSelect'
import TaskChecklist from '../TaskChecklist'
import { GoTasklist } from 'react-icons/go'

export const defaultFormikValues: ITaskDefaultValues = {
  title: '',
  type: TaskType.TASK,
  cover: '',
  assigneeIds: [],
  fileIds: [],
  taskStatusId: '',
  priority: TaskPriority.LOW,
  startDate: new Date(),
  dueDate: new Date(),
  plannedDueDate: new Date(),
  planedStartDate: new Date(),
  progress: 0,
  desc: '<p>Tell me what this task about 🤡</p>'
}

export interface ITaskDefaultValues {
  title: string
  cover: string
  type: TaskType
  assigneeIds: string[]
  fileIds: string[]
  taskStatusId: string
  priority: TaskPriority
  startDate: Date
  dueDate: Date
  plannedDueDate: Date
  planedStartDate: Date
  desc: string
  progress: number
}
interface ITaskFormProps {
  id: string
  cover?: string
  isUpdate?: boolean
  taskStatusId?: string
  dueDate?: Date
  defaultValue?: ITaskDefaultValues
  onSubmit: (v: ITaskDefaultValues, cb: () => void) => void
}

export default function TaskDetail({
  id,
  cover,
  dueDate,
  taskStatusId,
  onSubmit,
  defaultValue = defaultFormikValues
}: ITaskFormProps) {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const { statuses } = useProjectStatusStore()
  const refDefaultValue = useRef<ITaskDefaultValues>(defaultValue)
  // const submitTimeout = useRef(0)

  if (dueDate) {
    refDefaultValue.current = { ...refDefaultValue.current, dueDate }
  }

  if (taskStatusId) {
    refDefaultValue.current = { ...refDefaultValue.current, taskStatusId }
  }

  const formik = useFormik({
    initialValues: refDefaultValue.current,
    onSubmit: values => {
      if (loading) {
        messageWarning('Server is processing')
        return
      }

      setLoading(true)
      const mergedValues = { ...values, projectId: params.projectId }
      if (!Array.isArray(mergedValues.assigneeIds)) {
        mergedValues.assigneeIds = [mergedValues.assigneeIds]
      }

      const { error, errorArr } = validateTask(mergedValues)

      if (error) {
        setLoading(false)
        console.error(errorArr)
        return
      }

      onSubmit(mergedValues, () => {
        console.log('called')
      })
      setLoading(false)
    }
  })

  useEffect(() => {
    formik.setValues(defaultValue)
  }, [defaultValue])

  // select a default status if empty
  useEffect(() => {
    if (statuses.length && !formik.values.taskStatusId) {
      let min: TaskStatus | null = null
      statuses.forEach(stt => {
        if (!min) {
          min = stt
          return
        }

        if (min.order > stt.order) {
          min = stt
        }
      })

      if (min) {
        const status = min as TaskStatus
        formik.setFieldValue('taskStatusId', status.id)
      }
    }
  }, [statuses])

  const [titleVisible, setTitleVisible] = useState(true)
  const inpRef = useRef<HTMLInputElement>(null)

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="task-form space-y-3 gap-6 relative">
      {cover ? <TaskCover url={cover || ''} /> : null}
      <div className="">
        <div className="mb-2">
          <h2
            onClick={() => {
              setTitleVisible(false)
              setTimeout(() => {
                if (inpRef.current) {
                  console.log('run here')
                  const elem = inpRef.current
                  elem.focus()
                }
              }, 200)
            }}
            style={{ width: 'calc(100% - 40px)' }}
            className={`cursor-pointer font-bold text-2xl select-none ${titleVisible ? '' : 'hidden'
              }`}>
            {formik.values.title}
          </h2>

          {titleVisible ? null : (
            <input
              ref={inpRef}
              onBlur={() => setTitleVisible(true)}
              className=" task-title-input"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Enter your task name here !"
            />
          )}
        </div>
        <section className="task-infos">
          <div className="task-info-item">
            <div className="task-info-label">
              <HiOutlineSquare2Stack /> <span>Type</span>
            </div>
            <div className="task-info-content">
              <TaskTypeSelect
                width={200}
                value={formik.values.type}
                onChange={val => {
                  console.log('assignee:', val)
                  formik.setFieldValue('type', val)
                }}
              />
            </div>
          </div>
          <div className="task-info-item">
            <div className="task-info-label">
              <HiOutlineUser /> <span>Assignees</span>
            </div>
            <div className="task-info-content">
              <MemberPicker
                value={formik.values.assigneeIds[0]}
                onChange={val => {
                  console.log('assignee:', val)
                  formik.setFieldValue('assigneeIds', val)
                }}
              />
            </div>
          </div>
          <div className="task-info-item">
            <div className="task-info-label">
              <HiOutlineSquare2Stack /> <span>Status</span>
            </div>
            <div className="task-info-content">
              <StatusSelect
                value={formik.values.taskStatusId}
                onChange={val => {
                  formik.setFieldValue('taskStatusId', val)
                  console.log('status', val)
                }}
              />
            </div>
          </div>
          <div className="task-info-item">
            <div className="task-info-label">
              <HiOutlineFlag /> <span>Priority</span>
            </div>
            <div className="task-info-content">
              <PrioritySelect
                value={formik.values.priority}
                onChange={val => {
                  formik.setFieldValue('priority', val)
                  console.log('alo', val)
                }}
              />
            </div>
          </div>
          <div className="task-info-item">
            <div className="task-info-label">
              <HiOutlineClock /> <span>Start date</span>
            </div>
            <div className="task-info-content">
              <DatePicker
                enableTimer={true}
                value={formik.values.startDate}
                onChange={d => {
                  formik.setFieldValue('startDate', d)
                }}
              />
            </div>
          </div>
          <div className="task-info-item">
            <div className="task-info-label">
              <HiOutlineClock /> <span>Due date</span>
            </div>
            <div className="task-info-content">
              <DatePicker
                enableTimer={true}
                value={formik.values.dueDate}
                onChange={d => {
                  formik.setFieldValue('dueDate', d)
                }}
              />
            </div>
          </div>
          {/* <div className="task-info-item"> */}
          {/*   <div className="task-info-label"> */}
          {/*     <HiOutlineCalendar /> <span>Planned date</span> */}
          {/*   </div> */}
          {/*   <div className="task-info-content"> */}
          {/*     <div className="flex items-center gap-2"> */}
          {/*       <DatePicker */}
          {/*         value={formik.values.planedStartDate} */}
          {/*         onChange={d => { */}
          {/*           formik.setFieldValue('plannedStartDate', d) */}
          {/*         }} */}
          {/*       /> */}
          {/*       <span>-</span> */}
          {/*       <DatePicker */}
          {/*         value={formik.values.plannedDueDate} */}
          {/*         onChange={d => { */}
          {/*           formik.setFieldValue('plannedDueDate', d) */}
          {/*         }} */}
          {/*       /> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
          <div className="flex flex-col items-start pt-2">
            <div className="task-info-label">
              <GoTasklist /> <span>Checklist</span>
            </div>
            <div className="task-info-content w-full mt-4">
              <TaskChecklist taskId={id} />
            </div>
          </div>
          <div className="flex flex-col items-start pt-2">
            <div className="task-info-label">
              <HiOutlineBriefcase /> <span>Description</span>
            </div>
            <div className="task-info-content w-full mt-4">
              <TaskDescUpdate
                defaultValue={formik.values.desc}
                onChange={v => {
                  formik.setFieldValue('desc', v)
                }}
              />
            </div>
          </div>
        </section>
        <section className="task-tab-section">
          <Tab defaultValue="task-attachment">
            <Tab.List>
              <Tab.Trigger value="task-attachment">
                <HiOutlinePaperClip className="mr-2 text-lg text-gray-500" />
                Attachments
              </Tab.Trigger>
              <Tab.Trigger value="task-activity">
                <HiOutlineMap className="mr-2 text-lg text-gray-500" />
                Activities
              </Tab.Trigger>
              <Tab.Trigger value="task-comments">
                <HiOutlineChatBubbleLeft className="mr-2 text-lg text-gray-500" />
                Comments
              </Tab.Trigger>
            </Tab.List>

            <Tab.Content value="task-activity">
              <Activity taskId={id} />
            </Tab.Content>
            <Tab.Content value="task-attachment">
              <FileControl />
            </Tab.Content>
            <Tab.Content value="task-comments">
              <TaskComments taskId={id} />
            </Tab.Content>
          </Tab>
        </section>

        <section className="sticky bottom-[-99px] left-0 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
          <div className="text-right pt-3 pb-2">
            <Button
              type="submit"
              loading={loading}
              title="Submit changes"
              primary
            />
          </div>
        </section>
      </div>
    </form>
  )
}
