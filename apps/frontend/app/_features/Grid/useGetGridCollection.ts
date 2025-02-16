import { useEffect, useState } from "react"
import { GridCollection } from "@prisma/client"
import { gridCollectionSv } from "@/services/grid.collection"
import { useParams } from "next/navigation"

export function useGetGridCollection() {
  const { gridId } = useParams()
  const [gridCollection, setGridCollection] = useState<GridCollection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchGridCollection = async () => {
      try {
        setLoading(true)
        const { data } = await gridCollectionSv.getById(gridId as string)
        setGridCollection(data)
      } catch (error) {
        console.error('Error fetching grid collection:', error)
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    if (gridId) {
      fetchGridCollection()
    }
  }, [gridId])

  return { gridCollection, loading, error }
} 