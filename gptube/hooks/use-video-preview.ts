import type { ModelsYoutubePreAnalyzerReqBody } from '@/gptube-api'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/gptube-api'
import { extractYTVideoID } from '@/utils'

export function useVideoPreview(videoURL: string) {
    const [firstLoad, setFirstLoad] = useState(true)
  const mutation = useMutation({
    mutationFn: (data: ModelsYoutubePreAnalyzerReqBody) => {
      return apiClient.apiYoutubePreAnalysisPost({ video: data })
    },
  })

  const handleVideoPreview = () => {
    if (videoURL.length === 0) {
      return
    }
    const videoId = extractYTVideoID(videoURL)
    mutation.mutate({ videoId })
  }

  useEffect(
    () => {
        if (!firstLoad){
            handleVideoPreview()
        }
        setFirstLoad(false)
    }, [videoURL])

  return {
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    dataPreAnalysis: mutation.data,
  }
}