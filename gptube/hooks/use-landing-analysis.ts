import type { ModelsYoutubeAnalyzerLandingReqBody } from '@/gptube-api'
import type { FormEvent } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { apiClient } from '@/gptube-api'
import { getAnalysisLandingFromCache } from '@/services/get-analysis-landing-from-cache.service'
import { extractYTVideoID } from '@/utils'

import { videoQueryKeys } from './video-query-keys'

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

  const handleLandingAnalysis = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const videoLink = formData.get('videoLink')?.toString()

    if (!videoLink) {
      toast.error('Please enter a valid YouTube video link')

      return
    }

    const videoId = extractYTVideoID(videoLink)

    mutation.mutate({ videoId })
  }

  return {
    handleLandingAnalysis,
    isLoading: mutation.isLoading,
    dataAnalysis: mutation.data,
  }
}

export function useLandingAnalysisFromCache() {
  const query = useQuery({
    queryKey: videoQueryKeys.videoLanding(),
    queryFn: getAnalysisLandingFromCache,
  })

  useEffect(() => {
    if (query.isError) {
      toast.error('Something went wrong. Please try again later.')
    }
  }, [query.isError])

  return {
    analysisCacheQuery: query,
  }
}
