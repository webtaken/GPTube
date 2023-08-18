import type { ReactNode } from 'react'

import React from 'react'

import Footer from '../Footer'
import Header from '../Header/Header'

interface AdminLayoutProps {
  className?: string
  children?: ReactNode | ReactNode[]
}

function AdminLayout({ className, children }: AdminLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen bg-black-full ${className ?? ''}`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default AdminLayout
