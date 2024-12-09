import GridDeleteBtn from "./GridDeleteBtn"

export default function GridBtnActions({ display, rowId }: { display: boolean, rowId: string }) {
  if (!display) return null
  return <div className="grid-actions">
    <GridDeleteBtn rowId={rowId} />
  </div>
}
