import { Header } from '../header'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
