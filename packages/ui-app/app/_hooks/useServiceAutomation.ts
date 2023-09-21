import {
  automationAdd,
  automationDel,
  automationGet
} from '@/services/automation'
import {
  IAutomateThenProps,
  IAutomateWhenProps,
  useAutomationStore
} from '@/store/automation'
import { messageSuccess, randomId } from '@shared/ui'

export const useServiceAutomation = () => {
  const {
    addNewAutomation,
    addAllAutomation,
    updateAutomation,
    deleteAutomation
  } = useAutomationStore()

  const getAutomationByProject = (projectId: string) => {
    automationGet(projectId).then(res => {
      const { data } = res.data
      addAllAutomation(data)
    })
  }

  const delAutomation = (id: string) => {
    deleteAutomation(id)
    automationDel(id).then(res => {
      messageSuccess('Delete automation successfully')
      // deleteAutomation(id)
    })
  }

  const addAutomation = ({
    then,
    when,
    organizationId,
    projectId
  }: {
    then: IAutomateThenProps
    when: IAutomateWhenProps
    organizationId: string
    projectId: string
  }) => {
    const id = 'AUTOMATE_RAND_ID_' + randomId()

    addNewAutomation({
      id,
      then,
      when,
      organizationId,
      projectId
    })

    automationAdd({
      then: {
        value: then.value || '',
        change: then.change || ''
      },
      when: {
        happens: when.happens || '',
        is: when.is || '',
        valueTo: when.valueTo || null,
        valueFrom: when.valueFrom || null,
        equal: when.equal || null
      },
      organizationId,
      projectId
    })
      .then(res => {
        const { data } = res.data

        updateAutomation(id, data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return { addAutomation, getAutomationByProject, delAutomation }
}
