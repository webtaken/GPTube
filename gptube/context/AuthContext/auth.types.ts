import type { User } from 'firebase/auth'

export interface AuthContextProps {
  user: User | null
  isLoadingAuth: boolean
}
