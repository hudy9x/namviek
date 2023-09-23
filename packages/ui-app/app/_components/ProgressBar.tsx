interface IProgressBar {
  progress: number
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'dark' | 'indigo'
}
export default function ProgressBar({
  progress,
  color = 'blue'
}: IProgressBar) {
  const colors = {
    blue: ['bg-blue-600', 'text-blue-100'],
    red: ['bg-red-600', 'text-red-100'],
    green: ['bg-green-600', 'text-green-100'],
    yellow: ['bg-yellow-600', 'text-yellow-100 dark:text-yellow-100'],
    dark: ['bg-gray-600', 'text-gray-100'],
    indigo: ['bg-indigo-600', 'text-indigo-100']
  }

  const c = colors[color as keyof typeof colors]

  return (
    <div
      title={`${progress || 0}%`}
      className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className={`${c[0]} text-[10px] font-medium ${c[1]} text-center ${
          progress > 0 ? 'p-0.5' : 'py-0.5'
        } leading-none rounded-full`}
        style={{ width: `${progress || 0}%` }}>
        {progress >= 20 ? (
          <>{progress + '%'}</>
        ) : (
          <span className="pl-4 text-gray-600">{progress}%</span>
        )}
      </div>
    </div>
  )
}
