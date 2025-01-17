'use client'

import { resendVerifyEmail } from "@auth-client"
import { Button, messageError, messageSuccess, messageWarning } from "@ui-components"
import { useState } from "react"
import { BsMailbox } from "react-icons/bs"

export default function SignInactiveUser({
  enable,
  email,
  setIsUserInactive,
}: {
  enable: boolean
  email: string
  setIsUserInactive: () => void

}) {
  const [sending, setSending] = useState(false)

  const onResend = async () => {
    if (sending) return
    setSending(true)

    const cachedExpiredTime = localStorage.getItem('sendEmailExpired')
    if (cachedExpiredTime) {
      const expiredTime = new Date(cachedExpiredTime)
      const now = new Date()
      const second = (now.getTime() - expiredTime.getTime()) / 1000 // second
      if (second < 60) {
        messageWarning(`Please try to resend after ${Math.round(60 - second)}s`)
        setSending(false)
        return
      }
    }

    try {
      localStorage.setItem('sendEmailExpired', new Date().toString())
      await resendVerifyEmail(email)
      messageSuccess('Activation email sent')
      setSending(false)
      setTimeout(() => {
        setIsUserInactive()
      }, 300)
    } catch (error) {
      messageError('Error sending activation email')
    }
  }


  if (!enable) return null


  return <div className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center">
    <div
      onClick={() => setIsUserInactive()}
      className="absolute top-0 left-0 w-full h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"></div>
    <div className="relative z-10 w-[400px] rounded-md py-8 px-8 bg-white dark:bg-gray-900 border-2 border-indigo-500 mt-6 text-sm text-center text-gray-400">
      <BsMailbox className="w-14 h-14 rounded-md py-2 px-3 bg-indigo-500/80 dark:bg-indigo-500/60 text-white inline-block" />
      <h2 className="text-2xl font-bold mt-4 text-gray-600 dark:text-gray-200">
        Verify your email !
      </h2>
      <p className="mt-4">
        We found that you are already signed up your account. But have
        not verify it via email.
      </p>
      <p>Click on the below button to resend a verification email</p>
      <Button
        className="mt-4"
        loading={sending}
        primary
        block
        title="Send now"
        onClick={onResend}
      />
    </div>
  </div>
}
