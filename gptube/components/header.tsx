import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'

import { Button } from './common/button'

export function Header() {
  return (
    <Navbar isBordered maxWidth="lg">
      <NavbarBrand>
        <p className="text-2xl font-bold">GPTube</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="#">
            Sign in
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
