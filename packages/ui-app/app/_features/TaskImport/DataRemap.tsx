import ListPreset from '@/components/ListPreset'
import { useTaskImport } from './context'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { useEffect, useState } from 'react'
import { Cell, Row } from 'read-excel-file/types'

const useSplitColumns = (columns: string[]) => {
  const { heading } = useTaskImport()
  const headingOptions = heading.map((h, hidex) => ({
    id: hidex + '',
    title: h
  }))

  const half = Math.round(columns.length / 2)
  const headingCols = columns.slice(0, half)
  const tailCols = columns.slice(half, columns.length)

  return {
    headingOptions,
    headingCols,
    tailCols
  }
}

const useRemapData = () => {
  const { originRows, setRows } = useTaskImport()

  const [mapped, setMapped] = useState({
    taskName: 0,
    assignee: 1,
    dueDate: 2,
    priority: 3,
    point: 4,
    status: 5
  })

  useEffect(() => {
    const remapped: Row[] = []

    originRows.forEach(r => {
      const newRow = []
      for (const key in mapped) {
        const value = mapped[key as keyof typeof mapped]
        newRow.push(r[value])
      }

      remapped.push(newRow)
    })
    console.log('---------------')
    console.log(remapped[0])
    setRows(remapped)
  }, [mapped, originRows, setRows])

  return {
    setMapped,
    mapped
  }
}

export default function DataRemap() {
  const { mapped, setMapped } = useRemapData()
  const columns = Object.keys(mapped)
  const { headingCols, headingOptions, tailCols } = useSplitColumns(columns)

  const DataRemapRow = ({ col }: { col: string }) => {
    const value = mapped[col as keyof typeof mapped]
    return (
      <div className="flex items-center gap-2">
        <span>{col}</span>
        <HiOutlineArrowRight />
        <ListPreset
          width={150}
          value={value + ''}
          onChange={val => {
            setMapped(prev => {
              return { ...prev, [col]: parseInt(val) }
            })
          }}
          options={headingOptions}
        />
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 pb-2">
        Make sure that your data mapped to the following fields correctly.
      </p>

      <div className="flex gap-4 text-sm px-4 py-2 bg-indigo-50/50 dark:bg-gray-800 border dark:border-gray-700 rounded-md mb-2">
        <div className="space-y-2">
          {headingCols.map(col => {
            return <DataRemapRow key={col} col={col} />
          })}
        </div>
        <div className="space-y-2">
          {tailCols.map(col => {
            return <DataRemapRow key={col} col={col} />
          })}
        </div>
      </div>
    </div>
  )
}
