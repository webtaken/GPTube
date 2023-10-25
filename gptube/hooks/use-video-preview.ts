import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/gptube-api'
import { extractYTVideoID } from '@/utils'

export function useVideoPreview(videoURL: string) {
  const videoQuery = useQuery({
    queryFn: () => {
      const videoId = extractYTVideoID(videoURL)

      return apiClient.apiYoutubePreAnalysisPost({ video: { videoId } })
    },
    queryKey: ['video-preview', videoURL],
    enabled: videoURL.length > 0,
  })

  return {
    isLoading: videoQuery.isFetching,
    isError: videoQuery.isError,
    isSuccess: videoQuery.isSuccess,
    video: videoQuery.data,
  }
}
