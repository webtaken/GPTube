import type { ModelsYoutubeAnalyzerLandingReqBody } from '@/gptube-api'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { apiClient } from '@/gptube-api'
import { getAnalysisLandingFromCache } from '@/services/get-analysis-landing-from-cache.service'

export function useHandleLandingAnalysis() {
  const mutation = useMutation({
    mutationFn: (data: ModelsYoutubeAnalyzerLandingReqBody) => {
      return apiClient.apiYoutubeAnalysisLandingPost({
        video: data,
      })
    },
    onSuccess: data => {
      localStorage.setItem('gptube-analysis', JSON.stringify(data))
    },
    onError: () => {
      toast.error('Something went wrong. Please try again later.')
    },
  })

  const handleLandingAnalysis = (data: ModelsYoutubeAnalyzerLandingReqBody) => {
    mutation.mutate(data)
  }

  return {
    handleLandingAnalysis,
    isLoading: mutation.isLoading,
    dataAnalysis: mutation.data,
  }
}

export function useLandingAnalysisFromCache() {
  const query = useQuery({
    queryKey: ['landing-analysis'],
    queryFn: getAnalysisLandingFromCache,
  })

  useEffect(() => {
    if (query.isError) {
      toast.error('Something went wrong. Please try again later.')
    }
  }, [query.isError])

  return {
    analysisQuery: query,
  }
}
