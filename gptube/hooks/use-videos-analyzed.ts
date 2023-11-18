import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { getVideosAnalyzed } from '@/services/get-videos-analyzed.service'
import {
  INITIAL_PAGE_VIDEOS_ANALYZED,
  PAGE_SIZE_VIDEOS_ANALYZED,
} from '@/constants/videos-analyzed.constants'
import { extractSearchParamsVideo } from '@/utils/video.utils'

import { videoQueryKeys } from './video-query-keys'
import { useAuth } from './use-auth'

export function useVideosAnalyzed() {
  const { user } = useAuth()
  const [page, setPage] = useState(INITIAL_PAGE_VIDEOS_ANALYZED)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_VIDEOS_ANALYZED)

  const query = useQuery({
    queryFn: () => getVideosAnalyzed({ userId: '1', page, pageSize }),
    queryKey: videoQueryKeys.videosAnalyzed({
      userId: '1',
      page,
      pageSize,
    }),
    enabled: user !== null,
    keepPreviousData: true,
  })

  console.log(query)

  const totalVideos = query.data?.count ?? 0
  const totalPages = totalVideos / pageSize

  useEffect(() => {
    if (query.error instanceof Error) {
      toast.error(query.error.message)
    }
  }, [query.error, query.isError])

  const handleChangePage = (currentPage: number) => {
    setPage(+currentPage)
    // if (!query.data?.next) return

    // const { page: pageSearch, page_size } = extractSearchParamsVideo(query.data.next)

    // setPageSize(+page_size)
  }

  return {
    videos: query.data?.results,
    handleChangePage,
    totalPages,
    page,
    ...query,
  }
}
