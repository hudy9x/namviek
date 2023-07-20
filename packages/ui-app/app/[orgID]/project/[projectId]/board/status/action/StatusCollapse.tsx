import { BsChevronLeft } from 'react-icons/bs'

export const StatusCollapse = () => {
  return (
    <div className="hover:bg-gray-100 rounded-md w-6 h-full flex items-center justify-center">
      <BsChevronLeft className="cursor-pointer text-gray-500" />
    </div>
  )
}
