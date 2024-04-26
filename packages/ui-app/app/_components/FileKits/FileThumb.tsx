import { HiOutlineCamera, HiOutlineEye } from 'react-icons/hi2'
import { useFileKitContext, isImage, getIconUrl } from './context'

export default function FileThumb({
  name,
  src,
  ext,
  type,
  id
}: {
  name: string
  src: string
  ext: string
  type: string
  id: string
}) {
  const { setSelected, previewFiles } = useFileKitContext()
  const onView = () => {
    if (!id) return
    const idx = previewFiles.findIndex(pf => pf.id === id)
    if (idx !== -1) {
      setSelected(idx)
      window.stopEscapeKeyCloseModal = true
    }
  }

  if (isImage(type)) {
    return (
      <div
        onClick={onView}
        className="bg-gray-100 overflow-hidden group cursor-pointer relative dark:bg-gray-900 border-r dark:border-gray-700 rounded-l-md max-h-[88px] w-[120px] shrink-0">
        <img alt={name} className="h-auto w-auto rounded-l-md" src={src} />
        <HiOutlineCamera className="absolute left-2 bottom-2 text-gray-200 group-hover:opacity-100 opacity-0 w-7 h-7 p-1.5 rounded-md bg-black/50" />
      </div>
    )
  }

  return (
    <div
      onClick={onView}
      className="relative group bg-gray-100 dark:bg-gray-800 cursor-pointer border-r dark:border-gray-700 rounded-l-md max-h-[150px] w-[120px] shrink-0 flex items-center justify-center">
      <div className="">
        <img
          src={getIconUrl(ext)}
          className="w-[50px] px-1 py-1.5 bg-white dark:bg-gray-900 dark:border-gray-700 border rounded-md"
        />
      </div>
      <HiOutlineEye className="absolute left-2 bottom-2 text-gray-200 group-hover:opacity-100 opacity-0 w-7 h-7 p-1.5 rounded-md bg-black/50" />
    </div>
  )
}
