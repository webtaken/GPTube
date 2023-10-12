import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import Link from 'next/link'

import { useAuth, useAuthActions } from '@/hooks/use-auth'

import { Button } from './Common/button'

export function Header() {
  const { user } = useAuth()
  const { logoutHandler } = useAuthActions()

  return (
    <Navbar isBordered maxWidth="lg">
      <NavbarBrand>
        <p className="text-2xl font-bold">GPTube</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {user ? (
          <NavbarItem>
            <Button color="danger" radius="md" variant="flat" onClick={logoutHandler}>
              Sign out
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button as={Link} color="success" href="/login" radius="md" variant="flat">
              Sign in
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
}
