import type { Metadata } from 'next'

import { GeistSans } from 'geist/font/sans'

import { Providers } from './providers'

import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'GPTube',
  description: 'Welcome to a AI powered YouTube video analysis tool',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={GeistSans.variable} lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
