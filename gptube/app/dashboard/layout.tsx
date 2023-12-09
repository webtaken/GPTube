import type { Metadata } from 'next'

import { DashboardNavigation } from '@/components/dashboard/navigation'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'GPTube Dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <DashboardNavigation />
      <main className="max-w-screen-lg py-6 mx-auto space-y-6">{children}</main>
    </>
  )
}
