'use client'

import { Button, Form, messageError, messageSuccess, useForm } from '@shared/ui'
import { validateLoginUser } from '@shared/validation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Logo from '../../../components/Logo'

import { ISignin, resendVerifyEmail, signin } from '@goalie/nextjs'

export default function SigninForm() {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isUserInactive, setIsUserInactive] = useState(false)
  const [isDisabledBtn, setIsDisabledBtn] = useState(false)

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
          if (err.response.status === 403) {
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
    const RESEND_DELAY = 30000
    setIsDisabledBtn(true)
    try {
      await resendVerifyEmail(email)
      messageSuccess('Activation email sent')
      setTimeout(() => {
        setIsDisabledBtn(false)
      }, RESEND_DELAY)
    } catch (error) {
      console.log(error)
      setIsDisabledBtn(false)
      alert('Error sending activation email')
    }
  }

  return (
    <div className="sign-page h-screen w-screen flex items-center justify-center ">
      <div className="flex rounded-md border-2 border-indigo-300 shadow-2xl shadow-indigo-200">
        <form
          onSubmit={regHandleSubmit}
          className="bg-white dark:bg-gray-900 p-8 w-[350px] sm:w-[400px] rounded-md">
          <div className="flex gap-2 items-center">
            <Logo />
            <h2 className="text-xl sm:text-2xl font-bold">
              Welcome to Kampuni
            </h2>
          </div>
          <p className="text-gray-400 text-sm mt-3">
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
                className={`${
                  isDisabledBtn
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-indigo-600'
                } border-none resend-button hover:underline `}
                disabled={isDisabledBtn}>
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
