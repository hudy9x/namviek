interface IBadeProps {
  title: string
  pulse?: boolean
  color?: 'gray' | 'green' | 'yellow' | 'red' | 'pink' | 'indigo' | 'purple'
  onClick?: () => void
}
export default function Badge({
  title,
  pulse = false,
  color = 'gray',
  onClick
}: IBadeProps) {
  const classes = []

  pulse && classes.push('animate-pulse')

  color === 'gray' && classes.push('bg-gray-100 text-gray-600')
  color === 'red' && classes.push('bg-red-100 text-red-700')
  color === 'pink' && classes.push('bg-pink-100 text-pink-700')
  color === 'indigo' && classes.push('bg-indigo-100 text-indigo-700')
  color === 'purple' && classes.push('bg-purple-100 text-purple-700')
  color === 'green' && classes.push('bg-green-500 text-gray-100')
  color === 'yellow' &&
    classes.push('bg-yellow-500 text-gray-50 dark:bg-yellow-600')

  return (
    <div
      onClick={ev => {
        if (onClick) {
          ev.stopPropagation()
          onClick()
        }
      }}
      className={`${classes.join(
        ' '
      )} text-[10px] text-center rounded h-4 leading-4 inline-block px-2`}>
      {title}
    </div>
  )
}
