import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface IMyWorkContext {
  assigneeIds: string[]
  projectId: string
  setAssigneeIds: Dispatch<SetStateAction<string[]>>
  setProjectId: Dispatch<SetStateAction<string>>
}

const MyWorkContext = createContext<IMyWorkContext>({
  assigneeIds: [],
  projectId: 'all',
  setAssigneeIds: () => {
    console.log('1')
  },
  setProjectId: () => {
    console.log('1')
  }
})

export const MyWorkProvider = MyWorkContext.Provider

export const useMyworkContext = () => {
  const { assigneeIds, setAssigneeIds, projectId, setProjectId } =
    useContext(MyWorkContext)

  const selectProject = (pid: string) => {
    setProjectId(pid)
  }

  const selectAssignee = (uid: string) => {
    setAssigneeIds(pu => {
      if (pu.find(u => u === uid)) {
        return pu.filter(p => p !== uid)
      }
      return [uid, ...pu]
    })
  }
  return {
    selectAssignee,
    selectProject,
    assigneeIds,
    projectId,
    setProjectId,
    setAssigneeIds
  }
}
