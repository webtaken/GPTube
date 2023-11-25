'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from '@/context/AuthContext/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

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

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={() => router.push.bind(router)}>{children}</NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}
