import { fieldSv } from '@/services/field'
import { useProjectCustomFieldStore } from '@/store/customFields'
import { Field } from '@prisma/client'
import localforage from 'localforage'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export const useGetCustomFieldHandler = (projectId: string) => {
  const addCustomFields = useProjectCustomFieldStore(state => state.addAllCustomField)
  const key = `PROJECT_CUSTOM_FIELD_${projectId}`

  const fetchDataNCache = () => {
    const memberController = new AbortController()

    fieldSv.getByProjectId(projectId)
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

export const useGetCustomFields = () => {
  const { projectId } = useParams()
  const addAllCustomField = useProjectCustomFieldStore(state => state.addAllCustomField)
  const { fetch } = useGetCustomFieldHandler(projectId)
  const key = `PROJECT_CUSTOM_FIELD_${projectId}`

  useEffect(() => {
    localforage.getItem(key).then(val => {
      if (val) {
        addAllCustomField(val as Field[])
      }
    })
  }, [projectId])

  useEffect(() => {
    const { abortController } = fetch()

    return () => {
      abortController.abort()
    }
  }, [])
}
