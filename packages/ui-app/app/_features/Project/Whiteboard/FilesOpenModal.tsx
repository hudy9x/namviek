import { FileStorage } from '@prisma/client'
import { Dialog } from '@shared/ui'
import { MdDelete, MdOutlineOpenInNew } from 'react-icons/md'
import { useWhiteBoardContext } from './context'

const FilesOpenModal = ({
  visible,
  setVisible,
  onSubmit
}: {
  visible: boolean
  setVisible: () => void
  onSubmit: (file: FileStorage) => void
}) => {
  return (
    <Dialog.Root
      open={visible}
      onOpenChange={() => {
        setVisible()
      }}>
      <Dialog.Portal>
        <Dialog.Content size="lg">
          <FilesList onFileSubmit={onSubmit} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const FilesList = ({
  onFileSubmit
}: {
  onFileSubmit: (file: FileStorage) => void
}) => {
  const {
    // files,
    setSelectedFile
  } = useWhiteBoardContext()

  const files: FileStorage[] = []

  for (let i = 1; i <= 10; i++) {
    const obj = {
      id: i,
      name: `Name ${i}`,
      keyName: `key${i}`,
      url: i % 2 === 0 ? `https://example${i}.com` : null,
      size: i * 10.5,
      mimeType: i % 3 === 0 ? 'application/json' : null,
      owner: `Owner ${i}`,
      isDeleted: i % 5 === 0,
      createdBy: `Creator ${i}`,
      createdAt: new Date(`2024-10-03T08:50:${i < 10 ? '0' : ''}${i}Z`)
    }
    files.push(obj)
  }

  const handleSelectFile = (file: FileStorage) => {
    setSelectedFile(file)
    onFileSubmit(file)
  }

  const headerClass = 'whitespace-nowrap px-4 py-2 font-medium text-gray-900'
  const dataClass = 'whitespace-nowrap px-4 py-2 text-gray-700'

  return (
    <div>
      <div>Excalidraw files</div>

      <div className="rounded-lg border border-gray-200 mt-4">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className={headerClass}>Name</th>
                <th className={headerClass}>Created at</th>
                <th className={headerClass}>URL</th>
                <th className={headerClass}>#</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {files.map(file => (
                <tr key={file.id} className="odd:bg-gray-50">
                  <td className={dataClass}>{file.name}</td>
                  <td className={dataClass}>
                    {file.createdAt?.toLocaleString()}
                  </td>
                  <td className={dataClass}>{file.url}</td>
                  <td className={dataClass}>
                    <div className="flex gap-3">
                      <MdOutlineOpenInNew
                        size={20}
                        onClick={() => handleSelectFile(file)}
                        color="green"
                        className="cursor-pointer"
                      />
                      <MdDelete
                        size={20}
                        onClick={() => console.log('remove')}
                        color="red"
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FilesOpenModal
