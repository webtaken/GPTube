import type { ModelsYoutubeAnalyzerReqBody } from '@/gptube-api'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { apiClient } from '@/gptube-api'
import {
  DEFAULT_PAGE_PAGINATION,
  DEFAULT_PAGE_SIZE_PAGINATION,
  CONTACT_SUPPORT_X,
} from '@/constants/general.constants'

import { videoQueryKeys } from './video-query-keys'

export function useDashboardAnalysis() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: ModelsYoutubeAnalyzerReqBody) => {
      if (!data.email || data.email === '') {
        toast.success('Analysis started, please wait...')
      } else {
        toast.success('Analysis started, the results will be sent to your email.')
      }

      return apiClient.apiYoutubeAnalysisPost({
        video: data,
      })
    },
    onSuccess: data => {
      queryClient.invalidateQueries(
        videoQueryKeys.videosAnalyzed({
          // TODO: implement authentication
          userId: '1',
          page: DEFAULT_PAGE_PAGINATION,
          pageSize: DEFAULT_PAGE_SIZE_PAGINATION,
        }),
        { exact: true },
      )
      queryClient.setQueryData(videoQueryKeys.videoAnalysis(data.videoId || ''), data)
    },
    onError: error => {
      if (error instanceof Error) {
        toast.error(error.message)

        return
      }
      toast.error(
        `Something went wrong. Please try again later or contact ${CONTACT_SUPPORT_X} on X.`,
      )
    },
  })

  const handleAnalysis = async (userId: string, videoId: string, email?: string) => {
    const data: ModelsYoutubeAnalyzerReqBody = {
      userId: userId,
      videoId: videoId,
    }

    if (email && email !== '') {
      data.email = email
    }
    await mutation.mutateAsync(data)
  }

  useEffect(() => {
    if (mutation.error instanceof Error) {
      toast.error(mutation.error.message)
    }
  }, [mutation.error, mutation.isError])

  return {
    handleAnalysis,
    isLoading: mutation.isLoading,
    dataAnalysis: mutation.data,
  }
}
