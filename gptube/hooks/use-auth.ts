import type { FormEvent } from 'react'

import toast from 'react-hot-toast'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { AuthContext } from '@/context/AuthContext/AuthContext'
import {
  loginWithCredentials,
  loginWithGoogle,
  logout,
  signup,
  resetPassword,
} from '@/services/auth.services'

export function useAuth() {
  return useContext(AuthContext)
}

export function useAuthActions() {
  const router = useRouter()

  const loginWithCredentialsHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    try {
      await loginWithCredentials(data)
      toast.success('Logged in successfully 😸')
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Something went wrong, please try again.')
    }
  }

  const loginWithGoogleHandler = async () => {
    try {
      await loginWithGoogle()
      toast.success('Logged in successfully 😸')
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Something went wrong, please try again.')
    }
  }

  const logoutHandler = async () => {
    try {
      await logout()
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Something went wrong, please try again.')
    }
  }

  const resetPasswordHandler = async (email: string) => {
    try {
      await resetPassword(email)
      toast.success('Reset email sent.')
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Something went wrong, please try again.')
    }
  }

  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    try {
      await signup(data)
      toast.success('Signed up successfully 😸')
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Something went wrong, please try again.')
    }
  }

  return {
    loginWithCredentialsHandler,
    loginWithGoogleHandler,
    logoutHandler,
    resetPasswordHandler,
    signupHandler,
  }
}
