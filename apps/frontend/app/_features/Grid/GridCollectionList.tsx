'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button, Dialog, Form } from '@ui-components'
import { AiOutlinePlus } from 'react-icons/ai'
import { gridCollectionSv } from '@/services/grid.collection'
import { HiOutlineTableCells } from 'react-icons/hi2'
import { GridCollection } from '@prisma/client'
import Link from 'next/link'

interface AddGridCollectionModalProps {
  projectId: string
  onSuccess?: () => void
}

function AddGridCollectionModal({ projectId, onSuccess }: AddGridCollectionModalProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit = async () => {
    if (!title.trim()) return

    await gridCollectionSv.create({
      title: title.trim(),
      projectId
    })

    setTitle('')
    setOpen(false)
    onSuccess?.()
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          size="sm"
          ghost
          leadingIcon={<AiOutlinePlus />}
          title="Add Collection"
          className="w-full justify-start text-xs mt-1"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content size="sm">
          <div className="">
            <h3 className="text-lg font-medium mb-4">New Grid Collection</h3>

            <Form.Input
              placeholder="Collection name"
              value={title}
              helper='Enter your grid name'
              onChange={e => setTitle(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setOpen(false)} title='Cancel' />
              <Button primary onClick={handleSubmit} title='Create' />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface GridCollectionListProps {
  projectId: string
}

export default function GridCollectionList({ projectId }: GridCollectionListProps) {
  const [collections, setCollections] = useState<GridCollection[]>([])
  const pathname = usePathname()
  const { push } = useRouter()
  const { orgName } = useParams()

  const loadCollections = async () => {
    const { data } = await gridCollectionSv.getByProjectId(projectId)
    console.log('grid data2', data)
    if (!data) {
      return
    }
    setCollections(data)
  }

  useEffect(() => {
    loadCollections()
  }, [projectId])

  return (
    <div className="pl-3 pr-2 mt-1">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={`/${orgName}/proj/${projectId}/grid/${collection.id}`}
          className={`flex items-center gap-4 px-2 py-1.5 rounded text-gray-500 hover:text-gray-700 cursor-pointer ${pathname.includes(`/grid/${collection.id}`) ? 'bg-gray-100' : ''
            }`}
        >
          <HiOutlineTableCells className="w-4 h-4" />
          <span className="text-sm">{collection.title}</span>
        </Link>
      ))}

      <AddGridCollectionModal
        projectId={projectId}
        onSuccess={loadCollections}
      />
    </div>
  )
} 
