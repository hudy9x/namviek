'use client'

import { Button, Form, messageError, messageSuccess, useForm } from '@shared/ui'
import { validateLoginUser } from '@shared/validation'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '../../../components/Logo'

import {
  ISignin,
  resendVerifyEmail,
  saveGoalieUser,
  signin
} from '@goalie/nextjs'

export default function SigninForm() {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isUserInactive, setIsUserInactive] = useState(false)

  const resendBtnRef = useRef<null | HTMLButtonElement>(null)

  const { regField, regHandleSubmit } = useForm({
    values: {
      email: '',
      password: ''
    },
    validateFn: values => {
      console.log('validate', values)
      return validateLoginUser(values)
    },
    onSubmit: values => {
      if (loading) return
      setLoading(true)
      console.log(values)
      setEmail(values.email)
      signin(values as ISignin)
        .then(res => {
          push('/organization')

          // messageSuccess('Success')
        })
        .catch(err => {
          if (err === 'INACTIVE_ACCOUNT') {
            messageError(
              "You haven't activated your account yet. Please check your email for the activation link."
            )
            setIsUserInactive(true)
          } else {
            messageError('Your email or password are invalid')
          }
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  })

  const handleResendVerificationEmail = async () => {
    const RESEND_DELAY = 5000
    const resendBtn = resendBtnRef.current as HTMLButtonElement
    
    resendBtn.disabled = true
    try {
      await resendVerifyEmail(email)
      messageSuccess('Activation email sent')
      setTimeout(() => {
        resendBtn.disabled = false
      }, RESEND_DELAY)
    } catch (error) {
      console.log(error)
      alert('Error sending activation email')
      resendBtn.disabled = false
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen sign-page ">
      <div className="flex border-2 border-indigo-300 rounded-md shadow-2xl shadow-indigo-200">
        <form
          onSubmit={regHandleSubmit}
          className="bg-white dark:bg-gray-900 p-8 w-[350px] sm:w-[400px] rounded-md">
          <div className="flex items-center gap-2">
            <Logo />
            <h2 className="text-xl font-bold sm:text-2xl">
              Welcome to Kampuni
            </h2>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Enter your email and password to access to your worksppace.
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <Form.Input title="Email" {...regField('email')} />
            <Form.Input
              title="Password"
              type="password"
              {...regField('password')}
            />
            <Button
              loading={loading}
              title="Sign in"
              type="submit"
              block
              primary
            />
          </div>

          {isUserInactive && (
            <div className="flex items-center gap-1 mt-6 text-sm text-center text-gray-400">
              Haven&apos;t received the activation email?
              <button
                onClick={handleResendVerificationEmail}
                className="text-indigo-600 border-none resend-button hover:underline"
                ref={resendBtnRef}>
                Resend
              </button>
            </div>
          )}

          <div className="mt-6 text-sm text-center text-gray-400">
            Do not have any account ?{' '}
            <Link className="text-indigo-600 hover:underline" href={'/sign-up'}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
