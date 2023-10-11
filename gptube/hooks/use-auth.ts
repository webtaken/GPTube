import toast from 'react-hot-toast'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { AuthContext } from '@/context/AuthContext/AuthContext'
import {
  loginWithCredentials,
  loginWithGoogle,
  logout,
  resetPassword,
} from '@/services/auth.services'

export function useAuth() {
  return useContext(AuthContext)
}

export function useAuthActions() {
  const router = useRouter()

  const loginWithCredentialsHandler = async (props: { email: string; password: string }) => {
    try {
      await loginWithCredentials(props)
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
      toast.success('Logged successfully 😸')
      router.push('/')
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

  return {
    loginWithCredentialsHandler,
    loginWithGoogleHandler,
    logoutHandler,
    resetPasswordHandler,
  }
}
