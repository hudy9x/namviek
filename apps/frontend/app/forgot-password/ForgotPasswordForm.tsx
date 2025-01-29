'use client'

import {
  Button,
  Form,
  messageError,
  messageSuccess,
  useForm
} from '@ui-components'
import { validateEmail } from '@namviek/core/validation'
import Link from 'next/link'
import { useState } from 'react'
import Logo from '../../components/Logo'
import { forgotPassword } from '@auth-client'

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false)

  const { regField, regHandleSubmit } = useForm({
    values: {
      email: ''
    },
    validateFn: values => {
      const errors: Record<string, string> = {}
      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!validateEmail(values.email)) {
        errors.email = 'Invalid email format'
      }
      return errors
    },
    onSubmit: values => {
      submitHandler(values.email)
    }
  })

  const submitHandler = async (email: string) => {
    if (loading) return
    setLoading(true)

    try {
      await forgotPassword(email)
      messageSuccess('Password reset instructions have been sent to your email')
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
            className="bg-white dark:bg-gray-900/90 backdrop-blur-md w-[600px] shrink-0 px-24 pt-14">
            <div className='flex items-center gap-1'>
              <Logo />
              <span className='font-medium text-zinc-400 text-[25px]'>namviek</span>
            </div>

            <h2 className='mt-[45px] whitespace-nowrap text-[42px] dark:text-zinc-200 font-extrabold leading-tight text-[#2B3C4F]'>Reset Your Password</h2>

            <p className="text-[19px] mt-6 text-[#7A8799]">Enter your email address and we'll send you instructions to reset your password.</p>

            <div className="flex flex-col gap-4 mt-7">
              <Form.Input size='md' title="Email" {...regField('email')} error={regField('email').error} />

              <div className="space-y-3 mt-2">
                <Button
                  size='md'
                  loading={loading}
                  title="Send Reset Instructions"
                  type="submit"
                  block
                  primary
                />
              </div>
            </div>

            <div className="mt-6 text-center text-gray-400">
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