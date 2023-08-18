import type { AuthContextProps, CustomUser } from './auth.types'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { auth, googleAuthProvider } from '@/lib/firebase/config-firebase'

const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomUser>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    setLoading(false)

    return () => unsubscribe()
  }, [])

  const signup = (props: { email: string; password: string }) => {
    return createUserWithEmailAndPassword(auth, props.email, props.password)
  }

  const login = (props: { email: string; password: string }) => {
    return signInWithEmailAndPassword(auth, props.email, props.password)
  }

  const loginGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider)
  }

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, loginGoogle, signup, resetPassword, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
