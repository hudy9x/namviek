'use client'

import {
  Button,
  Form,
  messageError,
  messageSuccess,
  useForm
} from '@ui-components'
import { ParseResult, validateEmail, safeParse } from '@namviek/core/validation'
import Link from 'next/link'
import { useState } from 'react'
import Logo from '../../components/Logo'
import { forgotPassword } from '@auth-client'
import { useCooldown } from '@/hooks/useCooldown'
import { z } from 'zod'

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false)
  const { cooldownTime, isInCooldown, startCooldown } = useCooldown({
    key: 'lastForgotPasswordSubmit',
    duration: 30
  })

  const emailSchema = z.object({
    email: z.string()
      .min(1, 'Email is required')
      .email('Invalid email format')
  })

  const { regField, regHandleSubmit } = useForm({
    values: {
      email: ''
    },
    validateFn: values => {
      return safeParse(emailSchema, values)
    },
    onSubmit: values => {
      submitHandler(values.email)
    }
  })

  const submitHandler = async (email: string) => {
    if (loading || isInCooldown) return
    setLoading(true)

    try {
      await forgotPassword(email)
      messageSuccess('Password reset instructions have been sent to your email')
      startCooldown()
    } catch (error) {
      messageError('Failed to process your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sign-page relative h-screen w-screen flex items-center justify-center">
      <div className='relative shadow-lg dark:border-gray-800/50 w-screen h-screen'>
        <div className='absolute top-0 left-0 h-full w-full flex shadow-md'>
          <form
            onSubmit={regHandleSubmit}
            className="bg-white dark:bg-gray-900/90 backdrop-blur-md w-full md:w-[600px] shrink-0 px-6 md:px-24 pt-10 md:pt-14 overflow-y-auto">
            <div className='flex items-center gap-1'>
              <Logo />
              <span className='font-medium text-zinc-400 text-[25px]'>namviek</span>
            </div>

            <h2 className='mt-[30px] md:mt-[45px] text-[32px] md:text-[42px] dark:text-zinc-200 font-extrabold leading-tight text-[#2B3C4F]'>Forgot your password?</h2>

            <p className="text-[16px] md:text-[19px] mt-4 md:mt-6 text-[#7A8799]">Enter your email address and we'll send you instructions to reset your password.</p>

            <div className="flex flex-col gap-4 mt-6 md:mt-7">
              <Form.Input size='md' title="Email" {...regField('email')} error={regField('email').error} />

              <div className="space-y-3 mt-2">
                <Button
                  size='md'
                  loading={loading}
                  title={isInCooldown ? `Wait ${cooldownTime}s` : "Send Reset Instructions"}
                  type="submit"
                  block
                  primary
                  disabled={isInCooldown}
                />
              </div>
            </div>

            <div className="mt-6 text-center text-gray-400 mb-6 md:mb-0">
              Remember your password?{' '}
              <Link className="text-indigo-600 hover:underline" href={'/sign-in'}>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 
