import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import Link from 'next/link'

import { Button } from './Common/button'

export function Header() {
  return (
    <Navbar isBordered maxWidth="lg">
      <NavbarBrand>
        <p className="text-2xl font-bold">GPTube</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="success" href="/login" radius="md" variant="flat">
            Sign in
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
