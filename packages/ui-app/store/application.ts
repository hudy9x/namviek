import { create } from 'zustand'
import { produce } from 'immer'
import { Application } from '@prisma/client'
import { applicationSv } from '@/services/apps'

interface ApplicationState {
  applications: Application[]
  isLoading: boolean
  error: string | null
  fetchApplications: (orgId: string) => Promise<void>
  addApplication: (data: { name: string; desc?: string; orgId: string }) => Promise<void>
  updateApplication: (id: string, data: Partial<Application>) => Promise<void>
  deleteApplication: (id: string) => Promise<void>
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
      const { data: respondData } = res.data
      set((state) => ({
        applications: [...state.applications, respondData]
      }))
    } catch (err) {
      set({ error: 'Failed to create application' })
    } finally {
      set({ isLoading: false })
    }
  },

  updateApplication: async (id: string, data: Partial<Application>) => {
    try {
      const response = await applicationSv.update({ ...data, id })
      const { data: updatedApplication, status } = response.data

      if (status !== 200) {
        throw new Error('Failed to update application')
      }

      set(
        produce((state: ApplicationState) => {
          const app = state.applications.find(app => app.id === id)
          if (app) {
            Object.assign(app, updatedApplication)
          }
        })
      )
    } catch (error) {
      console.error('Failed to update application:', error)
      throw error
    }
  },

  deleteApplication: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await applicationSv.delete(id)
      set(
        produce((state: ApplicationState) => {
          state.applications = state.applications.filter(app => app.id !== id)
        })
      )
    } catch (err) {
      set({ error: 'Failed to delete application' })
    } finally {
      set({ isLoading: false })
    }
  },
}))
