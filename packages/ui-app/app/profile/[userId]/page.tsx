'use client'
import ProfileUpdateForm from '@/features/Profile/Update/ProfileUpdateForm'
import { useUser } from '@goalie/nextjs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const userId = user?.id
  if (typeof userId !== 'string') {
    return
  }
  return (
    <>
      <button
        type="button"
        onClick={() => router.back()}
        className="hidden sm:inline-block p-2 border rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:hover:bg-slate-800">
        <AiOutlineArrowLeft />
      </button>

      <ProfileUpdateForm userId={userId} />
    </>
  )
}
