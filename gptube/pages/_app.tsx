/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '@/styles/globals.css'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import type { LayoutsAvailable } from '@/components/Layouts/map-layouts'

import { useRouter } from 'next/router'
import Script from 'next/script'
import { NextUIProvider } from '@nextui-org/react'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import ProtectedRoute from '@/components/Security/ProtectedRoute'
import { AuthContextProvider } from '@/context/AuthContext/AuthContext'
import { MapLayouts } from '@/components/Layouts/map-layouts'

const noAuthRequired = ['/', '/login', '/reset', '/pricing']

type CustomAppProps = AppProps & {
  Component: NextComponentType & {
    Layout: LayoutsAvailable
  }
}

export default function App({ Component, pageProps }: CustomAppProps) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60, // 1 hour
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
          },
        },
      }),
  )
  const router = useRouter()

  const Layout = MapLayouts[Component.Layout]

  return (
    <NextUIProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              {noAuthRequired.includes(router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              )}
              <Toaster />
            </Layout>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthContextProvider>
      <Script defer src="https://assets.lemonsqueezy.com/lemon.js" />
    </NextUIProvider>
  )
}
