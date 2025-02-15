import { fieldSv } from '@/services/field'
import { useProjectCustomFieldStore } from '@/store/customFields'
import { Field } from '@prisma/client'
import localforage from 'localforage'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export const useGetCustomFieldHandler = (gridId: string) => {
  const addCustomFields = useProjectCustomFieldStore(state => state.addAllCustomField)
  const key = `PROJECT_CUSTOM_FIELD_${gridId}`

  const fetchDataNCache = () => {
    const memberController = new AbortController()

    console.log('gridId useGetCustomFieldHandler', gridId)
    fieldSv.getByGridCollectionId(gridId)
      .then(res => {
        const { data, status } = res.data
        console.log('custom field list', data, status)
        if (status !== 200) {
          addCustomFields([])
          return
        }

        localforage.setItem(key, data)
        setTimeout(() => {
          addCustomFields(data)
        }, 300)
      })
      .catch(err => {
        console.log(err)
      })
    return { abortController: memberController }
  }

  return {
    fetch: fetchDataNCache
  }
}

export const useGetGridFields = () => {
  const { gridId } = useParams()
  const addAllCustomField = useProjectCustomFieldStore(state => state.addAllCustomField)
  const { fetch } = useGetCustomFieldHandler(gridId)
  const key = `PROJECT_CUSTOM_FIELD_${gridId}`

  useEffect(() => {
    localforage.getItem(key).then(val => {
      if (val) {
        addAllCustomField(val as Field[])
      }
    })
  }, [gridId])

  useEffect(() => {
    const { abortController } = fetch()

    return () => {
      abortController.abort()
    }
  }, [])
}
