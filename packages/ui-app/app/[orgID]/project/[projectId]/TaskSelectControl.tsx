import React, { useCallback, useState } from 'react'
import { useTaskSelectContext } from './TaskSelectContext'
import MemberPicker from '@/components/MemberPicker'
import StatusSelect from '@/components/StatusSelect'
import PrioritySelect from '@/components/PrioritySelect'
import { Button, DatePickerBorderless } from '@shared/ui'
import { MdOutlineCancel } from 'react-icons/md'
import { Task } from '@prisma/client'
import { useTaskStore } from '@/store/task'
import { taskUpdateMany } from '@/services/task'

export default function TaskSelectControl() {
  const { selectedTasks, clearSelectedTasks } = useTaskSelectContext()
  const selectedTaskNum = selectedTasks?.length || 0
  const visible = !!selectedTaskNum
  const [taskOption, setTaskOption] = useState<Partial<Task>>({})
  const { updateTasks } = useTaskStore()

  const updateField = useCallback(
    (field: string) => (value: any) => {
      setTaskOption(prev => ({ ...prev, [field]: value }))
    },
    []
  )

  const handleSaveClick = useCallback(() => {
    clearSelectedTasks()
    const tasks = selectedTasks.map(task => ({
      ...task,
      ...taskOption
    }))
    const taskIds = selectedTasks.map(task => task.id)
    taskUpdateMany(taskIds, taskOption)
    updateTasks(tasks)
    setTaskOption({})
  }, [clearSelectedTasks, selectedTasks, taskOption, updateTasks])

  return (
    <div className={visible ? 'visible' : 'invisible'}>
      <div className="fixed top-0 left-0 right-0 ">
        <div className="relative flex justify-center py-3 border-2 border-slate-900 bg-white">
          <div className="absolute items-center left-2 text-center self-center ">
            {selectedTaskNum} task{selectedTaskNum > 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-4 items-center">
            <MemberPicker
              className="task-assignee"
              value={taskOption.assigneeIds?.[0] || undefined}
              onChange={v => updateField('assigneeIds')([v])}
            />
            <StatusSelect
              className="task-status"
              value={taskOption.taskStatusId || undefined}
              onChange={updateField('taskStatusId')}
            />
            <PrioritySelect
              className="task-priority"
              value={taskOption.priority || undefined}
              onChange={updateField('priority')}
            />
            <DatePickerBorderless
              className="task-date"
              value={taskOption.dueDate || undefined}
              onChange={updateField('dueDate')}
            />
            |
            <Button title="Save" onClick={handleSaveClick} />
          </div>
          <div
            className="absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-15%] flex items-center justify-center gap-2 group rounded-2xl border-2 border-slate-900 px-2 py-1 cursor-pointer"
            onClick={clearSelectedTasks}>
            <MdOutlineCancel className="group-hover:-rotate-180 transition-all" />
            <div className="text-sm">DISMISS</div>
          </div>
        </div>
      </div>
    </div>
  )
}
