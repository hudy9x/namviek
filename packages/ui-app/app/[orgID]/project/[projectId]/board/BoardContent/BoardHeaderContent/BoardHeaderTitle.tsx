interface Props {
  name: string
}

export const BoardHeaderTitle = ({ name }: Props) => {
  return (
    <div className="text-xs font-semibold flex items-center">
      <span>{name}</span>
    </div>
  )
}
