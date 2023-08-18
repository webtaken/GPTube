import type { ReactNode } from 'react'

import React from 'react'

interface AuthLayoutProps {
  className?: string
  children?: ReactNode | ReactNode[]
}

function AuthLayout({ className, children }: AuthLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen bg-black-full ${className ?? ''}`}>
      <main className="my-auto">{children}</main>
    </div>
  )
}

export default AuthLayout
