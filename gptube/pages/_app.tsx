import '@/styles/globals.css'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import type { LayoutsAvailable } from '@/components/Layouts/Layouts'

import { useRouter } from 'next/router'
import Script from 'next/script'
import { NextUIProvider } from '@nextui-org/react'

import { Layouts } from '@/components/Layouts/Layouts'
import { AuthContextProvider } from '@/context/AuthContext/AuthContext'
import ProtectedRoute from '@/components/Security/ProtectedRoute'

const noAuthRequired = ['/', '/login', '/reset', '/pricing']

type CustomAppProps = AppProps & {
  Component: NextComponentType & {
    Layout: LayoutsAvailable
  }
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const router = useRouter()
  const Layout = Layouts[Component.Layout]

  return (
    <NextUIProvider>
      <AuthContextProvider>
        <Layout>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </Layout>
      </AuthContextProvider>
      <Script defer src="https://assets.lemonsqueezy.com/lemon.js" />
    </NextUIProvider>
  )
}
