import AdminLayout from './AdminLayout'
import AuthLayout from './AuthLayout'

export const enum LayoutsAvailable {
  Auth = 'Auth',
  Admin = 'Admin',
}

export const Layouts = {
  [LayoutsAvailable.Auth]: AuthLayout,
  [LayoutsAvailable.Admin]: AdminLayout,
}

export type LayoutKeys = keyof typeof Layouts
