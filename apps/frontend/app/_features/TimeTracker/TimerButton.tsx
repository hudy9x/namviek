import React from 'react'
import { Button, messageWarning } from '@ui-components'
import { FaPlay, FaPause } from 'react-icons/fa'
import { useTimerStore } from './timerStore'

interface TimerButtonProps {
  taskId: string
  taskName?: string
  disabled?: boolean
  pauseOnly?: boolean
}

const TimerButton: React.FC<TimerButtonProps> = ({ taskId, taskName = '', disabled, pauseOnly = false }) => {
  const { startTimer, stopTimer, isRunning, activeTimer } = useTimerStore()

  const isCurrentTaskRunning = isRunning && activeTimer?.taskId === taskId

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering parent click events
    
    if (disabled) {
      messageWarning('This task is not available for time tracking')
      return
    }

    if (!isCurrentTaskRunning && pauseOnly) {
      return null
    }

    if (isCurrentTaskRunning) {
      // Stop the timer if it's already running for this task
      await stopTimer()
    } else if (isRunning) {
      // If another task's timer is running
      messageWarning('Please stop the current timer before starting a new one')
    } else {
      // Start a new timer
      await startTimer(taskId, taskName)
    }
  }

  return (
    <div 
      onClick={handleClick} 
      className={`w-5 h-5 border rounded-md p-[5px] ${
        isCurrentTaskRunning ? 'bg-red-500 border-red-500' : 
        pauseOnly ? 'hidden' : 'bg-white'
      } ${!pauseOnly ? 'cursor-pointer' : isCurrentTaskRunning ? 'cursor-pointer' : ''}`}
    >
      {isCurrentTaskRunning ? (
        <FaPause className="text-white w-full h-full" />
      ) : !pauseOnly && (
        <FaPlay className="text-gray-500 w-full h-full" />
      )}
    </div>
  )
}

export default TimerButton 