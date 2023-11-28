import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'

export function DashboardNavigation() {
  const pathname = usePathname()

  if (!pathname) return null

  if (pathname == '/dashboard') return null

  return (
    <Breadcrumbs className="max-w-screen-lg mx-auto mt-6">
      <BreadcrumbItem key="dashboard">
        <Link href="/dashboard">Dashboard</Link>
      </BreadcrumbItem>
      {pathname.startsWith('/dashboard/videos/') && (
        <BreadcrumbItem key="video">
          <Link href={pathname.replace('/negative-comments', '')}>Video</Link>
        </BreadcrumbItem>
      )}
      {pathname.endsWith('/negative-comments') && (
        <BreadcrumbItem key="comments">
          <Link href={pathname}>Comments</Link>
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  )
}
