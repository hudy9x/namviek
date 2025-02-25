'use client'

import { Button, Form, Loading, messageError, messageSuccess, useForm } from '@ui-components'
import { validateRegisterUser } from '@namviek/core/validation'
import Link from 'next/link'
import Logo from '../../../components/Logo'
import { useState } from 'react'
import { signup } from '@auth-client'
import { UserStatus } from '@prisma/client'
import { useRouter } from 'next/navigation'
import IntroSection from '@/features/IntroSection'

export default function SignupForm() {
  const { push } = useRouter()
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

          if (error) {
            if (error.meta.target === 'User_email_key') {
              messageError('Email already exist')
              return
            }

            messageError('Error')
            console.log(error)
            return
          }

          if (data && data.status === UserStatus.ACTIVE) {
            console.log('done')
            messageSuccess('Congratulations! Your account has been successfully created !')
            push('/sign-in')
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
    <div className="sign-page relative h-screen w-screen flex items-center justify-center ">
      <div className='relative dark:border-gray-800/50 w-screen h-screen'>
        <div className='absolute top-0 left-0 h-full w-full flex shadow-md'>
          {/* Success Form */}
          <div className={`bg-white dark:bg-gray-900/90 backdrop-blur-md w-[600px] shrink-0 px-24 pt-14 ${success ? '' : 'hidden'}`}>
            <div className='flex items-center gap-1'>
              <Logo />
              <span className='font-medium text-zinc-400 text-[25px]'>namviek</span>
            </div>
            
            <div className="text-center mt-10">
              <img src="/email.svg" className="m-auto pb-6 w-[200px]" />
              <h2 className="text-[42px] dark:text-zinc-200 font-extrabold leading-tight text-[#2B3C4F]">
                Successfully Registration
              </h2>
              <p className="text-[19px] mt-6 text-[#7A8799]">
                We have sent an activation link to your email to continue with the
                registration process
              </p>
              <p className="mt-8">
                <Link
                  className="text-indigo-600 hover:underline"
                  href={'/sign-in'}>
                  Back to Login
                </Link>
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <form
            onSubmit={regHandleSubmit}
            className={`${success ? 'hidden' : ''} bg-white dark:bg-gray-900/90 backdrop-blur-md w-[600px] shrink-0 px-24 pt-14`}>
            <div className='flex items-center gap-1'>
              <Logo />
              <span className='font-medium text-zinc-400 text-[25px]'>namviek</span>
            </div>

            <h2 className='mt-[45px] text-[42px] dark:text-zinc-200 font-extrabold leading-tight text-[#2B3C4F]'>Create Your Account Here</h2>

            <p className="text-[19px] mt-6 text-[#7A8799]">
              Our registration process is quick and easy, taking no more than 5 minutes to complete.
            </p>

            <div className="flex flex-col gap-4 mt-7">
              

              <Form.Input size='md' title="Fullname" {...regField('name')} />
              <Form.Input size='md' title="Email" {...regField('email')} />
              <Form.Input
                size='md'
                title="Password"
                type="password"
                {...regField('password')}
              />

              <div className="space-y-3 mt-2">
                <Button
                  size='md'
                  loading={loading}
                  title="Sign up"
                  type="submit"
                  block
                  primary
                />
              </div>
            </div>

            <div className="mt-6 text-center text-gray-400">
              Already have an account?{' '}
              <Link className="text-indigo-600 hover:underline" href={'/sign-in'}>
                Sign in
              </Link>
            </div>
          </form>

          <IntroSection /> 
        </div>
      </div>
    </div>
  )
}
