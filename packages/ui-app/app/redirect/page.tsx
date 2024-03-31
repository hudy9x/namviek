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
          {/* <Image src={'/logo71x71.png'} width={70} height={70} alt="Logo" /> */}
          <img className='w-[70px] h-[70px]' src='data:image/png;base64,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' />
        </h2>
        <div className="text-xs flex flex-col items-center gap-5 text-gray-900 dark:text-gray-400">
          <p>Authenticating your session</p>
          <LoadingSpinnerIcon />
        </div>
      </div>
    </div>
  )
}
