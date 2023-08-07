import './style.css'
import { OverviewProvider } from './context'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import OverviewContent from './OverviewContent'
import { DashboardComponent } from '@prisma/client'
import { dboardGet, dboardGetComponents } from '@/services/dashboard'
import { useParams } from 'next/navigation'

export default function ProjectOverview() {
  const { projectId } = useParams()

  const [loading, setLoading] = useState(false)
  const [dboardId, setDboardId] = useState('')
  const [components, setComponents] = useState<DashboardComponent[]>([])

  const delComponent = (id: string) => {
    setComponents(prevComps => prevComps.filter(comp => comp.id !== id))
  }

  // get default dashboard overview
  useEffect(() => {
    if (projectId) {
      setLoading(true)
      dboardGet(projectId)
        .then(res => {
          const { status, data } = res.data
          if (status !== 200) {
            return
          }

          setDboardId(data ? data.id : null)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [projectId])

  useEffect(() => {
    if (dboardId) {
      console.log('get components')
      dboardGetComponents(dboardId)
        .then(res => {
          const { data, status } = res.data

          if (status !== 200) {
            return
          }

          setComponents(data)
        })
        .catch(err => {
          console.log('get dboard error', err)
        })
        .finally(() => {
          console.log('done')
        })
    }
  }, [dboardId])

  return (
    <OverviewProvider
      value={{
        loading,
        dboardId,
        components,
        setLoading,
        setDboardId,
        setComponents,
        delComponent
      }}>
      <OverviewContent />
    </OverviewProvider>
  )
}
