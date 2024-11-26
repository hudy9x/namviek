import { create } from 'zustand'
import { Application } from '@prisma/client'
import { applicationSv } from '@/services/apps'

interface ApplicationState {
  applications: Application[]
  isLoading: boolean
  error: string | null
  fetchApplications: (orgId: string) => Promise<void>
  addApplication: (data: { name: string; desc?: string; orgId: string }) => Promise<void>
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  isLoading: false,
  error: null,

  fetchApplications: async (orgId: string) => {
    set({ isLoading: true, error: null })
    try {
      const result = await applicationSv.get(orgId)
      const { data } = result.data
      set({ applications: data })
    } catch (err) {
      set({ error: 'Failed to fetch applications' })
    } finally {
      set({ isLoading: false })
    }
  },

  addApplication: async (data: { name: string, desc?: string, orgId: string }) => {
    set({ isLoading: true, error: null })
    try {
      const res = await applicationSv.create(data)
      const { data } = res.data
      set((state) => ({
        applications: [...state.applications, data]
      }))
    } catch (err) {
      set({ error: 'Failed to create application' })
    } finally {
      set({ isLoading: false })
    }
  }
}))
