import { FirebaseError } from 'firebase/app'

import { ResponseError } from '@/gptube-api'

import { InternalServerError } from './errors-factory'

export function handleError(err: unknown, customMessage?: string): never {
  if (err instanceof FirebaseError) {
    throw new InternalServerError()
  }

  if (err instanceof ResponseError) {
    if (err.response.status === 500) {
      throw new InternalServerError()
    }

    if (err.response.status === 400) {
      throw new Error(err.message)
    }
  }

  throw new Error(customMessage || 'Something went wrong, try again', {
    cause: {
      message: 'unknown',
    },
  })
}
