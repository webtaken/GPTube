import { FirebaseError } from 'firebase/app'

import { InternalServerError } from './errors-factory'

export function handleError(err: unknown, customMessage?: string): never {
  if (err instanceof FirebaseError) {
    throw new InternalServerError()
  }

  throw new Error(customMessage || 'Something went wrong, try again', {
    cause: {
      message: 'unknown',
    },
  })
}
