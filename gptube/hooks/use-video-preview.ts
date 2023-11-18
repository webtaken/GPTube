import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/gptube-api'
import { extractYTVideoID } from '@/utils'
import { isValidYoutubeUrl } from '@/utils/validations.utils'

import { videoQueryKeys } from './video-query-keys'

export function useVideoPreview(videoURL: string) {
  const videoQuery = useQuery({
    queryFn: () => {
      const videoId = extractYTVideoID(videoURL)

      return apiClient.apiYoutubePreAnalysisPost({ video: { videoId } })
    },
    queryKey: videoQueryKeys.videoPreview(videoURL),
    enabled: videoURL.length > 0 && isValidYoutubeUrl(videoURL),
  })

  return {
    isLoading: videoQuery.isFetching,
    isError: videoQuery.isError,
    isSuccess: videoQuery.isSuccess,
    isIdle: videoQuery.fetchStatus === 'idle' && videoQuery.data === undefined,
    video: videoQuery.data,
  }
}
