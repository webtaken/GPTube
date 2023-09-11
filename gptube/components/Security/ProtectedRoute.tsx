import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { localStoreAuthVar } from '@/context/AuthContext/AuthContext'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(localStoreAuthVar)

    if (!user && !isAuthenticated) {
      router.push({
        pathname: '/login',
        query: {
          from: router.query.from,
        },
      })
    } else {
      localStorage.setItem(localStoreAuthVar, 'true')
    }
  }, [router, user])

  return <>{user ? children : null}</>
}

export default ProtectedRoute
