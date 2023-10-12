import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { auth, googleAuthProvider } from '@/lib/firebase/config-firebase'

export function signup(props: { email: string; password: string }) {
  return createUserWithEmailAndPassword(auth, props.email, props.password)
}

export async function loginWithCredentials(props: { email: string; password: string }) {
  try {
    await signInWithEmailAndPassword(auth, props.email, props.password)
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('User not found, please sign up.')
      }

      if (error.code === 'auth/wrong-password') {
        throw new Error('Wrong password')
      }
    }
    throw new Error('Something went wrong, please try again.')
  }
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
