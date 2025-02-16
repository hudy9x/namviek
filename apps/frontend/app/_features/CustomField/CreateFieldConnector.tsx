import { useParams } from "next/navigation"
import { useCustomFieldStore } from "./store"
import { useEffect, useState } from "react"
import { GridCollection } from "@prisma/client"
import { gridCollectionSv } from "@/services/grid.collection"

export default function CreateFieldConnector() {
  const { data, setData } = useCustomFieldStore()
  const { projectId, gridId } = useParams()
  const [grids, setGrids] = useState<GridCollection[]>([])
  
  useEffect(() => {
    const fetchGrids = async () => {
      try {
        const result = await gridCollectionSv.getByProjectId(projectId as string)
        // Filter out the current grid collection
        const filteredGrids = result.data.filter(
          (grid: GridCollection) => grid.id !== gridId
        )
        setGrids(filteredGrids)
      } catch (error) {
        console.error('Error fetching grids:', error)
      }
    }

    if (projectId) {
      fetchGrids()
    }
  }, [projectId, gridId])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Field Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
          value={data.name || ''}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Target Grid
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
          value={data.config?.targetGridCollectionId || ''}
          onChange={(e) => 
            setData({ 
              ...data, 
              config: { 
                ...data.config, 
                targetGridCollectionId: e.target.value 
              } 
            })
          }
        >
          <option value="">Select a grid</option>
          {grids.map((grid) => (
            <option key={grid.id} value={grid.id}>
              {grid.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
} 