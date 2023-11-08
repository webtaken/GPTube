const createCustomError = function (name: string, defaultMessage?: string) {
  return class CustomError extends Error {
    constructor(message?: string) {
      super(defaultMessage ?? message)
      this.name = name
    }
  }
}

export const InternalServerError = createCustomError(
  'InternalServerError',
  'Error interno del servidor',
)
