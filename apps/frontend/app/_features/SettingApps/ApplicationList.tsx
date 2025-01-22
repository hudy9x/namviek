import { useEffect, useState } from 'react'
import { Application } from '@prisma/client'
import { useApplicationStore } from '@/store/application'
import { Button, Card, confirmAlert, messageSuccess } from '@ui-components'
import { FiEye, FiEyeOff, FiCopy, FiTrash2 } from 'react-icons/fi'
import { useGetParams } from '@/hooks/useGetParams'

export const ApplicationList = () => {
  const { applications, fetchApplications } = useApplicationStore()
  const { orgId } = useGetParams()

  useEffect(() => {
    fetchApplications(orgId)
  }, [orgId])

  return (
    <div className="space-y-4">
      {applications.map((app: Application) => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  )
}

const ApplicationCard = ({ application }: { application: Application }) => {
  const [showSecret, setShowSecret] = useState(false)
  const { deleteApplication } = useApplicationStore()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        messageSuccess('Copied to clipboard')
        // Optionally, you can show a toast or notification here
        console.log('Copied to clipboard')
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  const handleDelete = async () => {
    confirmAlert({
      title: 'Delete Application',
      message: 'Are you sure you want to delete this application?',
      yes: async () => {
        await deleteApplication(application.id)
        messageSuccess('Application deleted successfully')
      }
    })
  }

  return (
    <Card className="p-4 group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium">{application.name}</h3>
          <div className="mt-2 text-sm space-y-2">
            <div className='flex items-center gap-3'>
              <span className="text-gray-500 shrink-0">Client ID: </span>
              <span className="">{application.clientId}</span>
              <Button
                className='group-hover:opacity-100 opacity-0 transition-all'
                size="sm"
                onClick={() => copyToClipboard(application.clientId)}
                leadingIcon={<FiCopy size={16} />}
              />
            </div>
            <div className='flex items-center gap-3'>
              <span className="text-gray-500 shrink-0">Client Secret: </span>
              <div className="flex items-center gap-2">
                <span className="">
                  {showSecret ? application.clientSecret : '••••••••••••••••'}
                </span>
                <Button
                  className='group-hover:opacity-100 opacity-0 transition-all'
                  size="sm"
                  onClick={() => setShowSecret(!showSecret)}
                  leadingIcon={showSecret ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                />
                <Button
                  className='group-hover:opacity-100 opacity-0 transition-all'
                  size="sm"
                  onClick={() => copyToClipboard(application.clientSecret)}
                  leadingIcon={<FiCopy size={16} />}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          onClick={handleDelete}
          leadingIcon={<FiTrash2 size={16} />}
        />
      </div>
    </Card>
  )
} 
