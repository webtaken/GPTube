import type { Metadata } from 'next'

import { GeistSans } from 'geist/font/sans'

import { Providers } from './providers'

import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | GPTube',
    default: 'GPTube',
  },
  description:
    'The official platform of GPTube, the most powerful sentiment analysis tool for youtube.',
  metadataBase: new URL('https://www.gptube.ink/'),
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
