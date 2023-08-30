import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { FirebaseError } from 'firebase/app'

import { AuthContext } from '@/context/AuthContext/AuthContext'

export function useAuth() {
  const router = useRouter()
  const origin = router.query.from
  const { loginWithCredentials, signup, loginWithGoogle, logout, resetPassword, user } =
    useContext(AuthContext)

  const redirection = () => {
    if (origin && !Array.isArray(origin)) router.push(origin)
    else router.push('/')
  }

  // TODO: The login and signup must be separate, is not the same
  const login = async (data: { email: string; password: string }) => {
    try {
      await loginWithCredentials(data)
      toast.success('logged in 😸')
      redirection()
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found') {
          try {
            await signup(data)
            redirection()
          } catch (signupError) {
            toast.error(String(signupError))
          }

          return
        }
        toast.error(String(error.message))
      } else {
        toast.error(String(error))
      }
    }
  }

  const loginWithGoogleHandler = async () => {
    try {
      await loginWithGoogle()
      toast.success('logged in 😸')
      redirection()
    } catch (error) {
      toast.error(String(error))
    }
  }

  const resetPasswordHandler = async ({ email }: { email: string }) => {
    try {
      await resetPassword(email)
      toast.success('Reset email sent.')
    } catch (error) {
      toast.error(String(error))
    }
  }

  return {
    user,
    login,
    logout,
    loginWithGoogleHandler,
    resetPasswordHandler,
  }
}
