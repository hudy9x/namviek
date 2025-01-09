{/* https://dribbble.com/shots/24565993-Create-account-Untitled-UI */ }
export default function SignCarousel() {

  return <div className="bg-blue-50/40 border-l dark:bg-gray-900 backdrop-blur-md p-8 w-[650px] rounded-r-md flex flex-col">

    <div className="w-[500px]">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h3 className="font-medium text-4xl">The simplest way to manage your workforce</h3>
          <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 min-h-[300px]">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">
            Hello and welcome! I'm your AI assistant, here to help you with anything you need.
            Whether you have questions, need recommendations, or want to manage your tasks,
            I'm here to make your life easier. Just type in what you need assistance with,
            and I'll do my best to provide the information or support you're looking for.
            Let's get started! How can I assist you?
          </p>
        </div>
      </div>
    </div>

  </div>
}
