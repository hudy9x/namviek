import { useState, useEffect } from 'react'

interface UseCooldownProps {
  key: string
  duration: number
}

export const useCooldown = ({ key, duration }: UseCooldownProps) => {
  const [cooldownTime, setCooldownTime] = useState<number>(0)

  const startCooldown = () => {
    localStorage.setItem(key, Date.now().toString())
    setCooldownTime(duration)
    const timer = setInterval(() => {
      setCooldownTime(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    const lastSubmitTime = localStorage.getItem(key)
    if (lastSubmitTime) {
      const timeLeft = duration - Math.floor((Date.now() - parseInt(lastSubmitTime)) / 1000)
      if (timeLeft > 0) {
        setCooldownTime(timeLeft)
        const timer = setInterval(() => {
          setCooldownTime(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
        return () => clearInterval(timer)
      }
    }
  }, [duration, key])

  return {
    cooldownTime,
    isInCooldown: cooldownTime > 0,
    startCooldown
  }
} 