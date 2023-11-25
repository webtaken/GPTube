import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { getVideoNegativeComments } from '@/services/get-video-negative-comments.service'

import { videoQueryKeys } from './video-query-keys'
import { useAuth } from './use-auth'

export function useNegativeComments(videoId: string, initPage: number, initPageSize: number) {
  const { user } = useAuth()
  const [page, setPage] = useState(initPage)
  const [pageSize, setPageSize] = useState(initPageSize)

  const query = useQuery({
    queryFn: () => getVideoNegativeComments({ userId: '1', videoId, page, pageSize }),
    queryKey: videoQueryKeys.videoNegativeComments({
      userId: '1',
      videoId,
      page,
      pageSize,
    }),
    enabled: user !== null,
    keepPreviousData: true,
  })

  const totalComments = query.data?.count ?? 0
  const totalPages = Math.ceil(totalComments / pageSize)

  useEffect(() => {
    if (query.error instanceof Error) {
      toast.error(query.error.message)
    }
  }, [query.error, query.isError])

  const pageChangeHandler = (currentPage: number) => {
    setPage(+currentPage)
    // if (!query.data?.next) return

    // const { page: pageSearch, page_size } = extractSearchParamsVideo(query.data.next)

    // setPageSize(+page_size)
  }

  const pageSizeChangeHandler = (newPageSize: number) => {
    setPage(1) // restart the initial page
    setPageSize(newPageSize)
  }

  return {
    commentsPage: query.data,
    pageChangeHandler,
    pageSizeChangeHandler,
    totalPages,
    page,
    pageSize,
    ...query,
  }
}
