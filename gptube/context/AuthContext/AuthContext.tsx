import type { AuthContextProps } from './auth.types'
import type { User } from 'firebase/auth'

import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/lib/firebase/config-firebase'

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    setLoading(false)

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoadingAuth: loading }}>{children}</AuthContext.Provider>
  )
}
