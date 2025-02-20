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
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden divide-y dark:divide-gray-700">
      {/* Header */}
      <div className="grid grid-cols-[2fr,2fr,2fr] gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300">
        <div>Name</div>
        <div>Client ID</div>
        <div>Client Secret</div>
      </div>

      {/* Rows */}
      {applications.map((app: Application, index: number) => (
        <TableRow 
          key={app.id} 
          application={app} 
          isLast={index === applications.length - 1}
        />
      ))}
    </div>
  )
}

const TableRow = ({ 
  application, 
  isLast 
}: { 
  application: Application
  isLast: boolean 
}) => {
  const [showSecret, setShowSecret] = useState(false)
  const { deleteApplication } = useApplicationStore()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        messageSuccess('Copied to clipboard')
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
    <div className={`grid grid-cols-[2fr,2fr,2fr] gap-4 px-4 py-3 bg-white dark:bg-gray-900 
      hover:bg-gray-50 dark:hover:bg-gray-800 items-center group text-sm
      ${isLast ? 'rounded-b-lg' : ''}`}>
      <div className="font-medium flex items-center justify-between dark:text-gray-200 shrink-0">
        <span>{application.name}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDelete}
          leadingIcon={<FiTrash2 size={16} />}
          className="opacity-0 group-hover:opacity-100 transition-all"
        />
      </div>
      
      <div className="flex items-center gap-2 dark:text-gray-300">
        <span className="truncate">{application.clientId}</span>
        <Button
          className="opacity-0 group-hover:opacity-100 transition-all"
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(application.clientId)}
          leadingIcon={<FiCopy size={16} />}
        />
      </div>

      <div className="flex items-center gap-2 dark:text-gray-300">
        <span className="truncate">
          {showSecret ? application.clientSecret : '••••••••••••••••'}
        </span>
        <Button
          className="opacity-0 group-hover:opacity-100 transition-all"
          size="sm"
          variant="ghost"
          onClick={() => setShowSecret(!showSecret)}
          leadingIcon={showSecret ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        />
        <Button
          className="opacity-0 group-hover:opacity-100 transition-all"
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(application.clientSecret)}
          leadingIcon={<FiCopy size={16} />}
        />
      </div>
    </div>
  )
} 
