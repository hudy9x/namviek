import { create } from 'zustand'
import { produce } from 'immer'
import { timerService } from '@/services/timer'
import { messageError, messageWarning } from '@ui-components'

interface Timer {
  id: string
  taskId: string
  userId: string
  startTime: string
  endTime: string | null
  duration: number
  createdAt: string
  updatedAt: string
}

interface TimerState {
  activeTimer: Timer | null
  elapsedTime: number
  isRunning: boolean
  taskName: string

  // Actions
  setActiveTimer: (timer: Timer | null) => void
  setElapsedTime: (time: number) => void
  setIsRunning: (isRunning: boolean) => void
  setTaskName: (name: string) => void

  // Thunks
  startTimer: (taskId: string, taskName?: string) => Promise<void>
  stopTimer: () => Promise<void>
  checkCurrentTimer: () => Promise<void>
}

export const useTimerStore = create<TimerState>((set, get) => ({
  activeTimer: null,
  elapsedTime: 0,
  isRunning: false,
  taskName: '',

  setActiveTimer: timer =>
    set(
      produce((state: TimerState) => {
        state.activeTimer = timer
      })
    ),

  setElapsedTime: time =>
    set(
      produce((state: TimerState) => {
        state.elapsedTime = time
      })
    ),

  setIsRunning: isRunning =>
    set(
      produce((state: TimerState) => {
        state.isRunning = isRunning
      })
    ),

  setTaskName: name =>
    set(
      produce((state: TimerState) => {
        state.taskName = name
      })
    ),

  startTimer: async (taskId, taskName = '') => {
    const { isRunning } = get()

    if (isRunning) {
      messageWarning(
        'You already have a running timer. Please stop it before starting a new one.'
      )
      return
    }

    try {
      const response = await timerService.startTimer(taskId)
      const { data } = response.data

      set(
        produce((state: TimerState) => {
          state.activeTimer = data
          state.isRunning = true
          state.elapsedTime = 0
          state.taskName = taskName
        })
      )
    } catch (error) {
      messageError('Error starting timer. You may have another timer running.')
    }
  },

  stopTimer: async () => {
    const { activeTimer } = get()

    if (!activeTimer) {
      messageWarning('No timer found')
      return
    }

    try {
      set(
        produce((state: TimerState) => {
          state.activeTimer = null
          state.isRunning = false
          state.taskName = ''
        })
      )
      await timerService.stopTimer(activeTimer.id)

    } catch (error) {
      messageError('Error stopping timer')
    }
  },

  checkCurrentTimer: async () => {
    try {
      const response = await timerService.getCurrentTimer()
      const { data } = response.data
      console.log('checkCurrentTimer 3333', data)

      if (data) {
        const startTime = new Date(data.startTime).getTime()
        const now = new Date().getTime()
        const elapsed = Math.floor((now - startTime) / 1000)

        set(
          produce((state: TimerState) => {
            state.activeTimer = data
            state.isRunning = true
            state.elapsedTime = elapsed
          })
        )
      }
    } catch (error) {
      // No running timer, that's okay
    }
  }
}))
