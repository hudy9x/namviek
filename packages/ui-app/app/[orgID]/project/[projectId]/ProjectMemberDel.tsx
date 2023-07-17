import { useParams } from 'next/navigation'
import { HiX } from 'react-icons/hi'

export default function ProjectMemberDel({ uid }: { uid: string }) {
  const { projectId } = useParams()
  const onDelete = () => {
    console.log('on deleted')
  }

  return (
    <HiX
      onClick={onDelete}
      className="w-7 h-7 p-1.5 cursor-pointer rounded-md border text-gray-500 hover:text-red-400"
    />
  )
}
