'use client'

import {
  Button,
  Form,
  messageError,
  setFixLoading,
  useForm
} from '@ui-components'
import { validateLoginUser } from '@namviek/core/validation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from "framer-motion";
import Logo from '../../../components/Logo'

import {
  ISignin,
  getGoalieUser,
  signin,
  useUser
} from '@auth-client'

import { getRecentVisit } from '@namviek/core/client'
import { signinWithGoogle } from 'apps/frontend/libs/firebase'
import { GAAction, GACategory, trackingEvent } from '@/components/GA/utils'
import SignCarousel from './SignCarousel'
import SignInactiveUser from './SignInactiveUser'

export default function SigninForm() {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isUserInactive, setIsUserInactive] = useState(false)
  const { setUser } = useUser()

  const { regField, regHandleSubmit } = useForm({
    values: {
      email: '',
      password: ''
    },
    validateFn: values => {
      return validateLoginUser(values)
    },
    onSubmit: values => {
      submitHandler({
        email: values.email,
        password: values.password,
        provider: 'EMAIL_PASSWORD'
      })
    }
  })

  const signInWithThirdParty = async () => {
    try {
      const result = await signinWithGoogle()
      const { user } = result
      const idToken = await user.getIdToken()

      submitHandler({
        email: user.email || '',
        password: idToken,
        provider: 'GOOGLE'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandler = (values: ISignin) => {
    if (loading) return
    setLoading(true)

    setEmail(values.email)
    signin(values)
      .then(res => {
        console.log('sign in return', res)
        trackingEvent({
          action: GAAction.SIGN_IN,
          category: GACategory.AUTHEN,
          value: values.email
        })
        try {
          const user = getGoalieUser()
          setUser(user)

          if (!user) {
            messageError('Something went wrong')
            return
          }

          const recentVisit = getRecentVisit(user.id)

          setFixLoading(true, {
            title: 'Redirecting to main screen ...',
            solid: true
          })
          if (recentVisit) {
            const location = window.location
            location.href = `${location.protocol}//${location.host}${recentVisit}`
          } else {
            push('/organization')
            setTimeout(() => {
              setFixLoading(false)
            }, 500)
          }
        } catch (error) {
          messageError('Something went wrong as getting user')
          console.log(error)
        }
      })
      .catch(err => {

        if (err === 'NOT_ACTIVE') {
          messageError(
            "You haven't activated your account yet. Please check your email for the activation link."
          )
          setIsUserInactive(true)
          return
        }

        messageError('Your email or password are invalid')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="sign-page relative h-screen w-screen flex items-center justify-center ">

      {/* <motion.div */}
      {/*   initial={{ opacity: 0, scale: 0.9 }} */}
      {/*   animate={{ opacity: 100, scale: 1 }} */}
      {/*   transition={{ delay: 0.5, duration: 2 }} */}
      {/*   className='sign-page-background absolute top-0 left-0 w-full h-full'></motion.div> */}

      {/* <motion.div */}
      {/*   initial={{ opacity: 0, y: 50 }} */}
      {/*   animate={{ opacity: 100, y: 0 }} */}
      {/*   transition={{ duration: 0.8 }} */}
      {/*   className="flex border-2 border-zinc-100 shadow-lg dark:border-gray-800/50 " */}
      {/*   style={{ borderRadius: `calc(0.375rem + 4px)` }}> */}
      {/**/}
      {/* </motion.div> */}

      <div className='relative shadow-lg dark:border-gray-800/50 w-screen h-screen'>

        {/* <div className='sign-border'></div> */}
        {/* <div className='absolute top-0 left-0  w-[1511px] h-[893px] border border-[#9494b3] bg-transparent shadow-lg rounded-lg'></div> */}

        {/* <div className='absolute top-[10px] left-[10px] w-[1491px] h-[873px] flex shadow-md'> */}
        <div className='absolute top-0 left-0 h-full w-full flex shadow-md'>
          <form
            onSubmit={regHandleSubmit}
            className="bg-white dark:bg-gray-900/90 backdrop-blur-md w-[600px] shrink-0 px-24 pt-14">
            <div className='flex items-center gap-1'>
              <Logo />
              <span className='font-medium text-zinc-400 text-[25px]'>namviek</span>
            </div>

            <h2 className='mt-[45px] text-[42px] dark:text-zinc-200 font-extrabold leading-tight text-[#2B3C4F]'>{`Welcome Back, Let's Get Started`}</h2>

            <p className="text-[19px] mt-6 text-[#7A8799]">Select your preferred sign-in method to jump right back into your projects.</p>

            <div className="flex flex-col gap-4 mt-7">
              <button onClick={ev => {
                ev.preventDefault()
                signInWithThirdParty()
              }} className='border bg-white hover:bg-zinc-50 shadow border-[#D0D5E1] rounded-lg text-base text-zinc-600 w-full flex items-center justify-center py-2.5 active:shadow-inner transition-all'>
                <img src="/google.png" className="w-4 h-4 mr-2" />
                Sign in with Google
              </button>

              {/* <Button */}
              {/*   onClick={signInWithThirdParty} */}
              {/*   block */}
              {/*   leadingIcon={<img src="/google.png" className="w-4 h-4 mr-2" />} */}
              {/*   title="Sign in with google" */}
              {/* /> */}

              <div className="relative mt-2 pb-1">
                <span className="text-base bg-white/95 dark:bg-gray-900/80 px-1 rounded-md absolute -top-[13px] left-1/2 -translate-x-1/2 z-10 text-gray-400">
                  or
                </span>
                <div className="absolute top-0 w-full border-b dark:border-gray-700"></div>
              </div>

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
                  title="Sign in"
                  type="submit"
                  block
                  primary
                />
              </div>
            </div>

            <div className="mt-6 text-center text-gray-400">
              {`Don't have any account ? `}
              <Link className="text-indigo-600 hover:underline" href={'/sign-up'}>
                Register
              </Link>
            </div>
          </form>


          <SignCarousel />

        </div>

      </div>
      <SignInactiveUser email={email} enable={isUserInactive} setIsUserInactive={() => setIsUserInactive(false)} />
    </div>
  )
}
