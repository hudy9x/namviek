import readXlsxFile from 'read-excel-file'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useTaskImport } from './context'

export default function TaskImportArea() {
  const { setRows } = useTaskImport()

  const uploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypes = ['xlsx']
    const file = e.target.files?.[0]

    if (!file) return
    const filename = file.name
    const extension = filename.split('.').pop()?.toLowerCase()
    const isValidExtensions = extension && fileTypes.indexOf(extension) > -1

    if (!isValidExtensions) return

    readXlsxFile(file)
      .then(rows => {
        e.target.value = ''
        if (!rows.length) return
        setRows(rows)
      })
      .catch(error => error)
  }

  return (
    <>
      <div className="mb-3">
        <p className="text-sm text-gray-500">
          The maximum size of upload files are less than 5mb. If you do not have
          any template file,{' '}
          <a className="text-indigo-500 hover:underline hover:cursor-pointer">
            download
          </a>{' '}
          here.
        </p>
      </div>
      <div className="w-full h-[180px] bg-indigo-50/50 border-dashed border-2 flex items-center justify-center rounded-md">
        <div className="text-center text-sm text-gray-400 space-y-2.5">
          <AiOutlineCloudUpload className="inline-flex w-9 h-9 bg-white rounded-md border p-1.5 shadow-sm " />
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
      </div>
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
