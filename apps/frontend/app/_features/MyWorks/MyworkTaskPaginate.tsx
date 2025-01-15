import { Button } from "@shared/ui";

interface IMyworkPaginate {
  enable: boolean
  page: number,
  maxPage: number,
  onNext: () => void,
  onPrev: () => void
}

export default function MyworkTaskPaginate({ enable, page, onNext, onPrev, maxPage }: IMyworkPaginate) {
  if (!enable) return null

  return <div className="flex items-center justify-between">
    <div className='space-x-2'>
      <Button disabled={page === 1} title="Prev" size="sm" onClick={() => {
        onPrev()
      }} />
      <Button disabled={page === maxPage} title="Next" size="sm" onClick={() => {
        onNext()
      }} />
    </div>
    <div className='text-xs text-gray-400'>
      {page}/{maxPage} pages
    </div>
  </div>
}
