import { ModelsYoutubeAnalyzerLandingReqBody, apiClient } from '@/gptube-api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function useLandingAnalysis (videoData: Partial<ModelsYoutubeAnalyzerLandingReqBody>) {
  const query = useQuery({
    queryKey: ['landing-analysis'],
    queryFn: () => {
      return apiClient.apiYoutubeAnalysisLandingPost({
        video: videoData!
      })
    },
    enabled: videoData != null && videoData.videoId != null
  })

  useEffect(() => {
    if (query.isSuccess) {
      localStorage.setItem('gptube-analysis', JSON.stringify(query.data))
    }
  }, [query.isSuccess])

  useEffect(() => {
    if (query.isError) {
      toast.error("Something went wrong. Please try again later.");
    }
  }, [query.isError]);


  return {
    isLoading: query.isLoading,
    isError: query.isError,
    data: query.data,
    isFetching: query.isFetching,
  }
}
