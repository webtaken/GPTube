import type { Analytics } from 'firebase/analytics'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { ENV_CONFIG } from '@/config/env-config'

const firebaseConfig = {
  apiKey: ENV_CONFIG.firebase.apiKey,
  authDomain: ENV_CONFIG.firebase.authDomain,
  projectId: ENV_CONFIG.firebase.projectId,
  storageBucket: ENV_CONFIG.firebase.storageBucket,
  messagingSenderId: ENV_CONFIG.firebase.messagingSenderId,
  appId: ENV_CONFIG.firebase.appId,
  measurementId: ENV_CONFIG.firebase.measurementId,
}

let analytics: Analytics
const app = initializeApp(firebaseConfig)

if (firebaseConfig.projectId) {
  // Initialize Firebase
  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app)
  }
}

export const auth = getAuth(app)

export const firestore = getFirestore(app)

export { analytics }

export const googleAuthProvider = new GoogleAuthProvider()
