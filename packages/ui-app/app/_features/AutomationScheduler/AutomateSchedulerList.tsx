import { useDebounce } from '@/hooks/useDebounce'
import { schedulerService } from '@/services/scheduler'
import { Scheduler } from '@prisma/client'
import { dateFormat } from '@shared/libs'
import { Button, Loading, confirmWarning } from '@shared/ui'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'
import { ISchedulerTrigger } from './context'

const useSchedulerList = () => {
  const [loading, setLoading] = useState(true)
  const { projectId } = useParams()
  const [schedulers, setScheduler] = useState<Scheduler[]>([])

  useDebounce(() => {
    setLoading(true)
    schedulerService
      .getAll(projectId)
      .then(res => {
        const { data } = res.data
        setScheduler(data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
  }, [projectId])

  const onDelete = (id: string) => {
    setScheduler(prev => prev.filter(s => s.id !== id))
    schedulerService
      .delete(id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return { loading, schedulers, onDelete }
}

export default function AutomateSchedulerList({
  openCreateForm
}: {
  openCreateForm: () => void
}) {
  const { loading, schedulers, onDelete } = useSchedulerList()

  return (
    <>
      <div className=" relative">
        {/* <Loading.Absolute enabled={loading} /> */}

        <h2 className="text-xl font-bold mb-3 flex items-center justify-between">
          <span>Scheduled Automation List</span>
          <Button
            title="Create new"
            onClick={openCreateForm}
            leadingIcon={<HiOutlinePlus />}
            primary
          />
        </h2>
        <div className="space-y-3">
          {loading ?
            <div className="box-2 text-sm">Loading ...</div> : null}
          {!loading && !schedulers.length ? (
            <div className="box-2 text-sm">
              No scheduled automation found !
            </div>
          ) : null}
          {schedulers.map(scheduler => {
            const { id, cronId, trigger, createdAt } = scheduler
            const { every, at } = trigger as ISchedulerTrigger
            let time = ''
            if (at?.hour) {
              time = `at ${at.hour}:${at.minute} ${at.period}`
            }

            const date = createdAt ? dateFormat(new Date(createdAt), 'PP') : ''

            return (
              <div className="box-2" key={id}>
                <span className="text-sm">
                  Trigger event every {every} {time}
                </span>
                <Button
                  onClick={() => {
                    confirmWarning({
                      title: 'Delete scheduled automation',
                      message:
                        'Are you sure you want to delet this event. Remember that it does not affect to any process ? ',
                      yes: () => {
                        onDelete(id)
                      }
                    })
                  }}
                  leadingIcon={<HiOutlineTrash />}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
