export default function BoardList({ items }: { items: string[] }) {
  return (
    <div className="board-list">
      {items.map(item => {
        return (
          <div className="board-item" key={item}>
            {item}
          </div>
        )
      })}
    </div>
  )
}
