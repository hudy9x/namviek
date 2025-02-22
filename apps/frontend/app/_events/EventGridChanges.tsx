import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useDataFetcher } from '@/components/DataFetcher/useDataFetcher'
import { useUser } from '@auth-client'
import { useParams } from 'next/navigation'

interface GridChangePayload {
  action: 'create' | 'delete' | 'update'
  data: any  // Record data for create, string (id) for delete
  triggerBy: string
}

// interface Props {
//   gridId: string
// }

export default function EventGridChanges() {
  const { gridId } = useParams()
  const { channelTeamCollab } = usePusher()
  const { setData, deleteRow } = useDataFetcher()
  const { user } = useUser()

  useEffect(() => {
    if (!gridId || !channelTeamCollab || !user) return

    const eventName = `grid:changes.${gridId}`
    console.log('bind event:', eventName)

    channelTeamCollab.bind(eventName, (payload: GridChangePayload) => {
      // Ignore if the change was triggered by the current user
      if (payload.triggerBy === user.id) return

      console.log('grid change event:', payload)

      switch (payload.action) {
        case 'create':
          console.log('create', payload.data)
          setData(prevData => [...prevData, payload.data])
          break

        case 'delete':
          const deletedId = payload.data

          console.log('delete id', deletedId)
          deleteRow(deletedId)
          break

        case 'update':
          console.log('update', payload.data)
          setData(prevData => prevData.map(row => row.id === payload.data.id ? payload.data : row))
          break
      }
    })

    return () => {
      channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab, gridId, user])

  return null
} 
