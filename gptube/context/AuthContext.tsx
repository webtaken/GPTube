import type { ReactNode } from 'react'
import type { UserCredential } from 'firebase/auth'

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

type UserProps = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
} | null

interface AuthContextProps {
  user: UserProps
  login: (email: string, password: string) => Promise<UserCredential>
  loginGoogle: () => Promise<UserCredential>
  signup: (email: string, password: string) => Promise<UserCredential>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

export const localStoreAuthVar = 'GPTubeAuthenticated'

export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [user, setUser] = useState<UserProps>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    setLoading(false)

    return () => unsubscribe()
  }, [])

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const loginGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider)
  }
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }
  const logout = async () => {
    setUser(null)
    localStorage.removeItem(localStoreAuthVar)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, loginGoogle, signup, resetPassword, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
