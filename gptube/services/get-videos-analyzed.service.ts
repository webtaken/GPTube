import { apiClient } from '@/gptube-api'
import { handleError } from '@/utils/errors/handle-error'

export async function getVideosAnalyzed({
  email,
  page,
  pageSize,
}: {
  email: string
  page: number
  pageSize?: number
}) {
  try {
    return await apiClient.apiYoutubeVideosGet({
      accountEmail: email,
      page,
      pageSize,
    })
  } catch (error) {
    handleError(error)
  }
}
