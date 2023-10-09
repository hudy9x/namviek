import { AiOutlineCloudUpload } from 'react-icons/ai'

export default function FileDesc({ inputId }: { inputId: string }) {
  return (
    <div className="file-area-desc">
      <AiOutlineCloudUpload className="w-8 h-8 shadow-sm border rounded-md bg-white p-1.5 text-gray-500" />
      <p className="text-center">
        <label
          className="underline cursor-pointer hover:text-gray-600"
          htmlFor={inputId}>
          Browse file to upload
        </label>
        , drag n drop <span className="block">Or paste your image here</span>
      </p>
    </div>
  )
}
