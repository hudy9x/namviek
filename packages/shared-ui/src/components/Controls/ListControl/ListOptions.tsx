export default function ListOptions({
  width,
  children
}: {
  width?: number
  children: JSX.Element[]
}) {
  return (
    <div className="select-options" style={{ width }}>
      {children}
    </div>
  )
}
