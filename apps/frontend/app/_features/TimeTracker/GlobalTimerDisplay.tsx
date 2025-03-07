'use client'
import React, { useEffect } from 'react'
import { useTimerStore } from './timerStore'
import { FaClock, FaStop } from 'react-icons/fa'
import { Card, Tooltip } from '@ui-components'

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    remainingSeconds.toString().padStart(2, '0')
  ].join(':')
}

const GlobalTimerDisplay: React.FC = () => {
  const { isRunning, elapsedTime, setElapsedTime, stopTimer, taskName } =
    useTimerStore()

  // Update timer every second if running
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(elapsedTime + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, elapsedTime, setElapsedTime])

  // Check for existing timer on mount
  useEffect(() => {
    useTimerStore.getState().checkCurrentTimer()
  }, [])

  if (!isRunning) return null

  return (
    <div className="fixed bottom-8 right-[100px] z-50">
      <div className="bg-white border rounded-lg px-4 py-2 shadow-md">

        <div className="flex items-center space-x-3 pr-6">
          <button
            onClick={stopTimer}
            className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors">
            <FaStop className="h-3 w-3" />
          </button>

          <div>
            {/* <span className="text-sm">{taskName || 'Task Timer'}</span> */}
            <Tooltip title={taskName || 'Task Timer'}>
              <div className="text-lg font-bold">
                {formatDuration(elapsedTime)}
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalTimerDisplay
