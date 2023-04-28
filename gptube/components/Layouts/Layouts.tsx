import AdminLayout from "./AdminLayout";
import AuthLayout from "./AuthLayout";
export const Layouts = {
  Auth: AuthLayout,
  Admin: AdminLayout,
};
export type LayoutKeys = keyof typeof Layouts;