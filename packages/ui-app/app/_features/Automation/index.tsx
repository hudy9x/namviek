'use client'
import { HiOutlineChevronRight } from 'react-icons/hi2'
import './style.css'
import ListPreset from '@/components/ListPreset'

export default function Automation() {
  return (
    <div>
      <div className="automation-wrapper w-[900px] mx-auto mt-10">
        <h2 className="text-xl text-gray-600 mb-4">Create custom automation</h2>
        <div className="automation-container">
          <div className="when">
            <div className="box flex items-center gap-3 ">
              <img
                className="w-10 h-10 p-2 border rounded-md bg-gray-50"
                src={
                  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f991.png'
                }
              />
              <div className="text-sm ">
                <h2 className="font-medium">When</h2>
                <p className="text-xs flex items-center gap-1">
                  This happens
                  <ListPreset
                    className="w-[150px] when-select"
                    value={'task'}
                    onChange={val => {
                      console.log(val)
                    }}
                    width={180}
                    options={[
                      { id: 'task', title: 'On a task' },
                      { id: 'subtask', title: 'On a subtask' },
                      { id: 'both', title: 'On tasks or subtasks' }
                    ]}
                  />
                </p>
              </div>
            </div>

            <div className="box box-connector">
              <ListPreset
                className="w-full"
                value={'status-changes'}
                onChange={val => {
                  console.log(val)
                }}
                width={180}
                options={[
                  { id: 'status-changes', title: 'Status changes' },
                  { id: 'progress-changes', title: 'Progress changes' },
                  { id: 'priority-changes', title: 'Priority changes' },
                  { id: 'duedate-changes', title: 'Due date changes' },
                  { id: 'assignee-added', title: 'Assignee added' },
                  { id: 'assignee-removed', title: 'Assignee removed' },
                  { id: 'duedate-arrive', title: 'Due date arrives' }
                ]}
              />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <HiOutlineChevronRight className="w-12 h-12 p-3 text-gray-400 bg-white rounded-lg border " />
          </div>
          <div className="then">
            <div className="box flex items-center gap-3 ">
              <img
                className="w-10 h-10 p-2 border rounded-md bg-gray-50"
                src={
                  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f958.png'
                }
              />
              <div className="text-sm ">
                <h2 className="font-medium">Then...</h2>
                <p className="text-xs flex items-center gap-1">
                  Do this action
                </p>
              </div>
            </div>

            <div className="box box-connector">
              <ListPreset
                className="w-full"
                value={'create-task'}
                onChange={val => {
                  console.log(val)
                }}
                width={180}
                options={[
                  { id: 'change-assignee', title: 'Change assignees' },
                  { id: 'create-task', title: 'Create a task' },
                  { id: 'create-subtask', title: 'Create a subtask' },
                  { id: 'change-status', title: 'Change status' },
                  { id: 'change-priority', title: 'Change priority' },
                  { id: 'change-due-date', title: 'Change due date' },
                  { id: 'comment', title: 'Comment' },
                  { id: 'duplicate', title: 'Duplicate' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
