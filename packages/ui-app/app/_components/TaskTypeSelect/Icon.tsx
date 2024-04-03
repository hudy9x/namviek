export default function TaskTypeIcon({ icon }: { icon?: string }) {
  if (!icon) {
    return (
      <div className="inline-flex w-[20px] h-[20px] rounded p-[1px] bg-gray-100 dark:bg-gray-800 border dark:border-gray-700">
        <img
          src={
            'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f340.png'
          }
          alt="Task type icon"
          className="w-full h-full"
        />
      </div>
    )
  }

  return (
    <div className="inline-flex w-[20px] h-[20px] rounded p-[1px] bg-gray-100 dark:bg-gray-800 border dark:border-gray-700">
      <img src={icon} alt="Task type icon" className="w-full h-full" />
    </div>
  )
}
