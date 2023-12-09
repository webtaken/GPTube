import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LandingUI } from '@/components/landing/landing-ui'

export const metadata: Metadata = {
  title: 'GPTube Landing',
}

// TODO: Set this page as the default landing page, the Dashboard component should be in the "/dashboard" route
export default function Home() {
  return (
    <>
      <Header />
      <LandingUI />
      <Footer />
    </>
  )
}
