import { useEffect, useState } from 'react'
import { Application } from '@prisma/client'
import { useApplicationStore } from '@/store/application'
import { Button, Card } from '@shared/ui'
import { FiEye, FiEyeOff } from 'react-icons/fi'
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

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{application.name}</h3>
          <div className="mt-2 space-y-2">
            <div className='flex items-center gap-3'>
              <span className="text-gray-500 shrink-0">Client ID: </span>
              <code className="">{application.clientId}</code>
            </div>
            <div className='flex items-center gap-3'>
              <span className="text-gray-500 shrink-0">Client Secret: </span>
              <div className="flex items-center gap-2">
                <code className="">
                  {showSecret ? application.clientSecret : '••••••••••••••••'}
                </code>
                <Button
                  ghost
                  size="sm"
                  onClick={() => setShowSecret(!showSecret)}
                  leadingIcon={showSecret ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          {application.status}
        </div>
      </div>
    </Card>
  )
} 
