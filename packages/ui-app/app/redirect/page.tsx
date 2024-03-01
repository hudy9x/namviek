import Image from 'next/image'
import UserChecking from './UserChecking'

const LoadingSpinnerIcon = () => {
  return (
    <svg
      className="animate-spin duration-100 w-[15px] h-[15px]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

export default async function Index() {
  return (
    <div className="h-screen w-screen bg-white dark:bg-gray-900 text-7xl flex items-center justify-center uppercase">
      <UserChecking />
      <div className="text-center">
        <h2 className="logo -mt-10 w-16 h-16 inline-flex items-center justify-center mb-5">
          <Image src={'/logo71x71.png'} width={70} height={70} alt="Logo" />
        </h2>
        <div className="text-xs flex flex-col items-center gap-5 text-gray-900 dark:text-gray-400">
          <p>Authenticating your session</p>
          <LoadingSpinnerIcon />
        </div>
      </div>
    </div>
  )
}
