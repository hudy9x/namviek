import { DashboardComponentType } from '@prisma/client'
import { Button, Modal } from '@shared/ui'
import { useEffect, useState } from 'react'
import DashboardComponentUpdateForm from './DashboardComponentUpdateForm'
import './dboard-component-create.css'

interface IChartType {
  type: DashboardComponentType
  title: string
  desc: string
  icon: string
}

const charts: IChartType[] = [
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Number of Tasks in Progress',
    desc: 'See how many tasks are in progress in any location',
    icon: '🚀'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Number of Tasks Closed',
    desc: 'See how many tasks are closed in any location',
    icon: '🎄'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Number of Upcoming Tasks',
    desc: 'See how many tasks are done in any location',
    icon: '🔮'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Total Urgent Tasks',
    desc: 'Display the total amount of Urgent tasks by location',
    icon: '🚑'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Total Overdue Tasks',
    desc: 'Display the total amount of Overdue tasks by location',
    icon: '🌋'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Today Tasks',
    desc: 'Display the total amount of today tasks by location',
    icon: '💼'
  },
  {
    type: DashboardComponentType.COLUMN,
    title: 'Task by statuses',
    desc: 'Display the total amount of task by status',
    icon: '🚦'
  }
  // { type: DashboardComponentType.PIE, desc: '', icon: '' },
  // { type: DashboardComponentType.LINE, desc: '', icon: '' },
  // { type: DashboardComponentType.LIST, desc: '', icon: '' }
]

export default function DashboardComponentCreate() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<IChartType | null>()

  const showSettingForm = type ? true : false

  useEffect(() => {
    !visible && setType(null)
  }, [visible])

  console.log(type)

  return (
    <div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Select your components"
        className={showSettingForm ? 'show-setting-component-form' : ''}
        size={showSettingForm ? 'base' : `lg`}
        triggerBy={
          <div>
            <Button size="sm" title="Create component" />
          </div>
        }
        content={
          <>
            <div className="grid grid-cols-3 gap-2">
              {!showSettingForm &&
                charts.map((c, cid) => {
                  const { type, title, desc, icon } = c
                  return (
                    <div
                      onClick={() => setType(c)}
                      key={cid}
                      className={`chart-type chart-type-${type} border rounded-md transition-all hover:shadow-md hover:shadow-gray-100 px-4 py-3 cursor-pointer text-center space-y-1.5 group bg-white`}>
                      <span className="text-3xl opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all">
                        {icon}
                      </span>
                      <h2 className="uppercase text-xs font-medium text-gray-400">
                        {type}
                      </h2>
                      <h3 className="text-xs font-bold text-gray-600 group-hover:text-indigo-600 transition-all">
                        {title}
                      </h3>
                      <p className="text-gray-500 text-xs">{desc}</p>
                    </div>
                  )
                })}
            </div>
            {showSettingForm ? (
              <DashboardComponentUpdateForm
                {...type}
                onCloseModal={() => setVisible(false)}
                onBack={() => setType(null)}
              />
            ) : null}
          </>
        }
      />
    </div>
  )
}
