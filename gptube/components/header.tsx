import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { LogIn, LayoutDashboard } from "lucide-react";

import { useAuth, useAuthActions } from "@/hooks/use-auth";

import { Button } from "./Common/button";
import { LogoGPTube } from "./gptube-logo";

export function Header() {
  const { user } = useAuth();
  const { logoutHandler } = useAuthActions();

  return (
    <Navbar isBordered maxWidth="lg">
      <NavbarBrand className="gap-2">
        <LogoGPTube className="w-10 h-10" />
        <p className="text-2xl font-bold">GPTube</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {user ? (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  showFallback
                  className="cursor-pointer"
                  role="button"
                  src={user.photoURL ?? undefined}
                />
              </DropdownTrigger>
              <DropdownMenu
                variant="light"
                onAction={(key) => {
                  if (key === "logout") {
                    logoutHandler();
                  }
                }}
              >
                <DropdownItem key="profile" disableAnimation className="gap-2 h-14">
                  <p className="font-medium">{user.displayName}</p>
                  <p className="text-neutral-500">{user.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  disableAnimation
                  className="font-medium gap-2 h-14"
                  startContent={<LayoutDashboard className="w-4 h-4" />}
                >
                  <Link href="/dashboard">Go to dashboard</Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="font-medium"
                  color="danger"
                  startContent={<LogIn className="w-4 h-4" />}
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
  );
}
