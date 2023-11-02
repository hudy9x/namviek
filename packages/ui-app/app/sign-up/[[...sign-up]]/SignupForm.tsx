'use client'

import { Button, Form, Loading, messageError, useForm } from '@shared/ui'
import { validateRegisterUser } from '@shared/validation'
import Link from 'next/link'
import Logo from '../../../components/Logo'
import { useState } from 'react'
import { signup } from '@goalie/nextjs'

export default function SignupForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { regField, regHandleSubmit } = useForm({
    values: {
      email: '',
      password: '',
      name: ''
    },
    validateFn: values => {
      return validateRegisterUser(values)
    },
    onSubmit: values => {
      if (loading) return

      setLoading(true)
      signup(values)
        .then(res => {
          const { data, error } = res.data
          console.log(data, error)

          if (error) {
            if (error.meta.target === 'User_email_key') {
              messageError('Email already exist')
              return
            }

            messageError('Error')
            console.log(error)
            return
          }

          setSuccess(true)
        })
        .catch(err => {
          console.log(err)
          messageError('Your information is invalid')
        })
        .finally(() => setLoading(false))
    }
  })

  return (
    <div className="sign-page h-screen w-screen flex items-center justify-center ">
      <div className="flex rounded-md border-2 border-indigo-300 shadow-2xl shadow-indigo-200">
        <div
          className={`w-[350px] sm:w-[400px] text-center p-8 rounded-md bg-white dark:bg-gray-900 ${
            success ? '' : 'hidden'
          }`}>
          <img src="/email.svg" className="m-auto pb-6 w-[200px]" />
          <h2 className="text-xl sm:text-2xl font-bold mt-3">
            Successfully Registration
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            We have sent an activation link to your email to continue with the
            registration process
          </p>
          <p className="mt-4">
            <Link
              className="text-sm text-indigo-600 hover:underline"
              href={'/sign-in'}>
              Back to Login
            </Link>
          </p>
        </div>

        <form
          onSubmit={regHandleSubmit}
          className={`${
            success ? 'hidden' : ''
          } bg-white dark:bg-gray-900 p-8 w-[350px] sm:w-[400px] rounded-md`}>
          <div className="flex gap-2 items-center">
            <Logo />
            <h2 className="text-xl sm:text-2xl font-bold">Sign up now</h2>
          </div>
          <p className="text-gray-400 text-sm mt-3">
            Our registration process is quick and easy, taking no more than 5
            minutes to complete.
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <Form.Input title="Fullname" {...regField('name')} />
            <Form.Input title="Email" {...regField('email')} />
            <Form.Input
              title="Password"
              type="password"
              {...regField('password')}
            />
            <Button title="Sign up" type="submit" block primary />
          </div>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Have a account ?{' '}
            <Link className="text-indigo-600 hover:underline" href={'/sign-in'}>
              Login
            </Link>
          </div>
        </form>
      </div>

      {/* <SignUp /> */}
    </div>
  )
}
