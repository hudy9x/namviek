'use client'

import {
  Button,
  Form,
  messageError,
  messageSuccess,
  messageWarning,
  setFixLoading,
  useForm
} from '@shared/ui'
import { validateLoginUser } from '@shared/validation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from "framer-motion";
import Logo from '../../../components/Logo'

import {
  ISignin,
  getGoalieUser,
  resendVerifyEmail,
  signin,
  useUser
} from '@goalie/nextjs'
import { BsMailbox } from 'react-icons/bs'
import { getRecentVisit } from '@shared/libs'
import { signinWithGoogle } from 'packages/ui-app/libs/firebase'
import { GAAction, GACategory, trackingEvent } from '@/components/GA/utils'

export default function SigninForm() {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isUserInactive, setIsUserInactive] = useState(false)
  const [sending, setSending] = useState(false)
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
            title: 'Redirecting to main screen ...'
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
        setIsUserInactive(false)
      }, 300)
    } catch (error) {
      messageError('Error sending activation email')
    }
  }

  return (
    <div className="sign-page relative h-screen w-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 100, scale: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className='sign-page-background absolute top-0 left-0 w-full h-full'></motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex border-4 border-white/30 dark:border-gray-800/50 "
        style={{ borderRadius: `calc(0.375rem + 4px)` }}>
        <form
          onSubmit={regHandleSubmit}
          className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-md px-[100px] py-[150px] w-[450px] sm:w-[550px] rounded-l-md">
          <div className="flex gap-2 items-center">
            <Logo />
            <h2 className="text-xl sm:text-2xl font-bold">
              Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
            </h2>
          </div>
          <p className="text-gray-400 text-sm mt-3">
            Enter your email and password to access to your workspace.
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <Button
              onClick={signInWithThirdParty}
              block
              leadingIcon={<img src="/google.png" className="w-4 h-4 mr-2" />}
              title="Sign in with google"
            />
            <div className="relative mt-2 pb-1">
              <span className="text-sm bg-white/95 dark:bg-gray-900/80 px-1 rounded-md absolute -top-[10px] left-1/2 -translate-x-1/2 z-10 text-gray-400">
                or
              </span>
              <div className="absolute top-0 w-full border-b dark:border-gray-700"></div>
            </div>
            <Form.Input title="Email" {...regField('email')} />
            <Form.Input
              title="Password"
              type="password"
              {...regField('password')}
            />

            <div className="space-y-3 mt-2">
              <Button
                loading={loading}
                title="Sign in"
                type="submit"
                block
                primary
              />
            </div>
          </div>

          <div className="mt-6 text-sm text-center text-gray-400">
            {`Don't have any account ? `}
            <Link className="text-indigo-600 hover:underline" href={'/sign-up'}>
              Register
            </Link>
          </div>
        </form>

{/* https://dribbble.com/shots/24565993-Create-account-Untitled-UI */}
        <div className="bg-gray-50 dark:bg-gray-900 backdrop-blur-md p-8 w-[650px] rounded-r-md flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
              <img src="/ai-avatar.png" alt="AI Assistant" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI Assistant</h3>
              <p className="text-sm text-gray-500">Here to help you</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto mb-4 min-h-[300px]">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300">
                Hello and welcome! I'm your AI assistant, here to help you with anything you need. 
                Whether you have questions, need recommendations, or want to manage your tasks, 
                I'm here to make your life easier. Just type in what you need assistance with, 
                and I'll do my best to provide the information or support you're looking for. 
                Let's get started! How can I assist you?
              </p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Ask me anything"
              className="w-full p-3 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
              disabled
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>

        {isUserInactive && (
          <div className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center">
            <div
              onClick={() => setIsUserInactive(false)}
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
        )}
      </motion.div>
    </div>
  )
}
