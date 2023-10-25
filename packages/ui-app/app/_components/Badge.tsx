interface IBadeProps {
  title: string
  color?: 'gray' | 'green' | 'yellow' | 'red'
}
export default function Badge({ title, color = 'gray' }: IBadeProps) {
  const classes = []

  color === 'gray' && classes.push('bg-gray-100 text-gray-600')
  color === 'red' && classes.push('bg-red-400 text-gray-50')
  color === 'green' && classes.push('bg-green-500 text-gray-100')
  color === 'yellow' &&
    classes.push('bg-yellow-500 text-gray-50 dark:bg-yellow-600')

  return (
    <div
      className={`${classes.join(
        ' '
      )} text-[10px] text-center rounded-sm px-1`}>
      {title}
    </div>
  )
}
