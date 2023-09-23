import { Configuration, DefaultApi } from './generated-api'

export * from './generated-api'

const apiConfig = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
})

export const apiClient = new DefaultApi(apiConfig)
