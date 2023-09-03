import { Rubik } from 'next/font/google'

import { Header } from '../header'

const rubik = Rubik({
  subsets: ['latin'],
})

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={rubik.className}>
      <Header />
      {children}
    </main>
  )
}
