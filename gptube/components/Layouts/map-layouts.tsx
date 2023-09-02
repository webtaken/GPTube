import { MainLayout } from './main-layout'
import AuthLayout from './AuthLayout'

export const enum LayoutsAvailable {
  Auth = 'Auth',
  Admin = 'Admin',
}

export const MapLayouts = {
  [LayoutsAvailable.Auth]: AuthLayout,
  [LayoutsAvailable.Admin]: MainLayout,
}
