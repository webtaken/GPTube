import type { UserCredential } from 'firebase/auth'

export type CustomUser = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
} | null

export interface AuthContextProps {
  user: CustomUser
  loginGoogle: () => Promise<UserCredential>
  logout: () => Promise<void>
  login: (props: { email: string; password: string }) => Promise<UserCredential>
  signup: (props: { email: string; password: string }) => Promise<UserCredential>
  resetPassword: (email: string) => Promise<void>
}
