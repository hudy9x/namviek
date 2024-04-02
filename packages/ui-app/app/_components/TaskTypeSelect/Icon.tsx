export default function TaskTypeIcon({ icon }: { icon?: string }) {
  if (!icon) {
    return (
      <div className="inline-flex w-[20px] h-[20px] rounded p-0.5 bg-gray-100 border">
        <img src={''} alt="Task type icon" className="w-full h-full" />
      </div>
    )
  }

  return (
    <div className="inline-flex w-[20px] h-[20px] rounded p-0.5 bg-gray-100 border">
      <img src={icon} alt="Task type icon" className="w-full h-full" />
    </div>
  )
}
