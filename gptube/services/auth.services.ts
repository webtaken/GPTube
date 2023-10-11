import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { auth, googleAuthProvider } from '@/lib/firebase/config-firebase'

export function signup(props: { email: string; password: string }) {
  return createUserWithEmailAndPassword(auth, props.email, props.password)
}

export function loginWithCredentials(props: { email: string; password: string }) {
  return signInWithEmailAndPassword(auth, props.email, props.password)
}

export function loginWithGoogle() {
  return signInWithPopup(auth, googleAuthProvider)
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email)
}

export function logout() {
  return signOut(auth)
}
