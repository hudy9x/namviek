import readXlsxFile from 'read-excel-file'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useTaskImport } from './context'
import DropFileZone from '@/components/DropFileZone'
import { messageError } from '@shared/ui'

export default function TaskImportArea() {
  const { setRows } = useTaskImport()

  const readImportFile = (file: File) => {
    const fileTypes = ['xlsx']
    const filename = file.name
    const extension = filename.split('.').pop()?.toLowerCase()
    const isValidExtensions = extension && fileTypes.indexOf(extension) > -1

    if (!isValidExtensions) {
      messageError('Import file must be .XLSX or .CSV')
      return
    }

    readXlsxFile(file)
      .then(rows => {
        if (!rows.length) return
        rows.shift()
        setRows(rows)
      })
      .catch(error => error)
  }

  const uploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    readImportFile(file)
    e.target.value = ''
  }

  const onDropChange = (files: File[]) => {
    if (!files.length) return
    readImportFile(files[0])
  }

  return (
    <>
      <div className="mb-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The maximum size of upload files are less than 5mb. If you do not have
          any template file,{' '}
          <a
            href="/import-template.xlsx"
            download={'Import-Template.xlsx'}
            className="text-indigo-500 hover:underline hover:cursor-pointer">
            download
          </a>{' '}
          here.
        </p>
      </div>
      <DropFileZone
        onChange={onDropChange}
        className="w-full h-[180px] bg-indigo-50/50 dark:bg-slate-800 dark:border-gray-700 border-dashed border-2 flex items-center justify-center rounded-md">
        <div className="text-center text-sm text-gray-400 space-y-2.5">
          <AiOutlineCloudUpload className="inline-flex w-9 h-9 bg-white dark:bg-gray-900 dark:border-gray-700 rounded-md border p-1.5 shadow-sm " />
          <p>
            Drag & drop or{' '}
            <label
              htmlFor="file"
              className="text-indigo-500 hover:underline hover:cursor-pointer">
              choose file
            </label>{' '}
            to upload
          </p>
          <p className="font-medium text-gray-500">XLSX or CSV</p>
        </div>
      </DropFileZone>
      <input
        type="file"
        name="file"
        id="file"
        className="hidden"
        onChange={e => uploadExcel(e)}
      />
    </>
  )
}
