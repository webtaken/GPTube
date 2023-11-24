import type { ApiYoutubeVideosVideoIdNegativeCommentsGetRequest } from '@/gptube-api'

import { apiClient } from '@/gptube-api'
import { handleError } from '@/utils/errors/handle-error'

export async function getVideoNegativeComments({
  userId,
  videoId,
  page,
  pageSize,
}: {
  userId: string
  videoId: string
  page?: number
  pageSize?: number
}) {
  try {
    const params: ApiYoutubeVideosVideoIdNegativeCommentsGetRequest = {
      userId: userId,
      videoId: videoId,
    }

    if (page) params.page = page
    if (pageSize) params.pageSize = pageSize

    const data = await apiClient.apiYoutubeVideosVideoIdNegativeCommentsGet(params)

    return data
  } catch (error) {
    handleError(error)
  }
}
