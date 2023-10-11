'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LandingUI } from '@/components/landing/landing-ui'
import { useAuth } from '@/hooks/use-auth'

export default function Home() {
  const { isLoadingAuth, user } = useAuth()

  if (isLoadingAuth) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      {user ? <div>Logged in as {user.email}</div> : <LandingUI />}
      <Footer />
    </>
  )
}
