/* eslint-disable @next/next/no-img-element */
import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
import { useProjectStatusStore } from '../../store/status'
import { useProjectStore } from '@/store/project'

const List = Form.List

interface IStatusSelectProps {
  value?: string
  className?: string
  onChange?: (v: string) => void
  title?: string
  placeholder?: string
}

const defaultOption: ListItemValue = {
  id: '0',
  title: ''
}

export default function ProjectSelect({
  title,
  className,
  value,
  onChange,
  placeholder
}: IStatusSelectProps) {
  const { projects } = useProjectStore()

  const [options, setOptions] = useState<ListItemValue[]>([])
  const [val, setVal] = useState(defaultOption)
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (projects.length) {
      setOptions(projects.map(p => ({ id: p.id + '', title: p.name + '' })))
    }
  }, [projects])

  useEffect(() => {
    if (projects.length) {
      const selectedProject = projects.find(opt => opt.id === value)
      selectedProject &&
        setVal({ id: selectedProject.id, title: selectedProject.name })
    }
  }, [projects, value])

  useEffect(() => {
    if (updateCounter) {
      onChange && onChange(val.id)
    }
  }, [updateCounter, val])

  const existingProject = projects.find(stt => stt.id === val.id)

  return (
    <div className={className}>
      <List
        title={title}
        placeholder={placeholder}
        value={val}
        onChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>
          <div className="flex items-center gap-2">
            <img
              alt="project icon"
              className="w-4 h-4 rounded-md cursor-pointer"
              src={
                existingProject?.icon ??
                'https://img.icons8.com/color/48/cancel-2--v1.png'
              }
            />
            <span>{existingProject?.name ?? 'No Project'}</span>
          </div>
        </List.Button>
        <List.Options>
          {options.map(option => {
            const prj = projects.find(pr => pr.id === option.id)
            return (
              <List.Item key={option.id} value={option}>
                <div className="flex items-center gap-2">
                  <img
                    alt="project icon"
                    className="w-4 h-4 rounded-md cursor-pointer"
                    src={
                      prj?.icon ??
                      'https://img.icons8.com/color/48/cancel-2--v1.png'
                    }
                  />
                  <span>{option.title}</span>
                </div>
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}
