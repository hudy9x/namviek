'use client'

import {
  Button,
  Form,
  messageError,
  messageSuccess,
  useForm
} from '@ui-components'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '../../../components/Logo'
import { resetPassword } from '@auth-client'

interface Props {
  token: string
}

export default function ResetPasswordForm({ token }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { regField, regHandleSubmit } = useForm({
    values: {
      password: '',
      confirmPassword: ''
    },
    validateFn: values => {
      const errors: Record<string, string> = {}
      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
      return errors
    },
    onSubmit: values => {
      submitHandler(values.password)
    }
  })

  const submitHandler = async (password: string) => {
    if (loading) return
    setLoading(true)

    console.log('token', token)
    console.log('password', password)

    try {
      await resetPassword({ token, password })
      messageSuccess('Password has been reset successfully')
      router.push('/reset-password/success')
    } catch (error) {
      messageError('Failed to reset password. The link may be invalid or expired.')
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
            className="bg-white dark:bg-gray-900/90 backdrop-blur-md w-[640px] shrink-0 px-24 pt-14">
            <div className='flex items-center gap-1'>
              <Logo />
              <span className='font-medium text-zinc-400 text-[25px]'>namviek</span>
            </div>

            <h2 className='mt-[45px] text-[42px] dark:text-zinc-200 font-extrabold leading-tight text-[#2B3C4F]'>Reset Your Password</h2>

            <p className="text-[19px] mt-6 text-[#7A8799]">Please enter your new password below.</p>

            <div className="flex flex-col gap-4 mt-7">
              <Form.Input
                size='md'
                title="New Password"
                type="password"
                {...regField('password')}
              />
              <Form.Input
                size='md'
                title="Confirm Password"
                type="password"
                {...regField('confirmPassword')}
              />

              <div className="space-y-3 mt-2">
                <Button
                  size='md'
                  loading={loading}
                  title="Reset Password"
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