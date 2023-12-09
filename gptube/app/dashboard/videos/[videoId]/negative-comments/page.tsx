'use client'

import {
  DEFAULT_PAGE_PAGINATION,
  DEFAULT_PAGE_SIZE_PAGINATION,
} from '@/constants/general.constants'
import { useNegativeComments } from '@/hooks/use-negative-comments'
import { NegativeCommentsTopActions } from '@/components/videos/negative-comments/NegativeCommentsTopActions'
import { NegativeComments } from '@/components/videos/negative-comments/NegativeComments'

// TODO: Set this page as protected route for new users
function NegativeCommentsPage({ params }: { params: { videoId: string } }) {
  const { videoId } = params
  const {
    commentsPage,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    pageChangeHandler,
    pageSizeChangeHandler,
    page,
    pageSize,
    totalPages,
    isFetching,
  } = useNegativeComments(videoId, DEFAULT_PAGE_PAGINATION, DEFAULT_PAGE_SIZE_PAGINATION)

  return (
    <>
      <NegativeCommentsTopActions
        count={commentsPage?.count}
        isErrorComments={isErrorComments}
        isFetching={isFetching}
        isLoading={isLoadingComments}
        page={page}
        pageChangeHandler={pageChangeHandler}
        pageSize={pageSize}
        pageSizeChangeHandler={pageSizeChangeHandler}
        totalPages={totalPages}
      />
      <NegativeComments
        isFetching={isFetching}
        isLoading={isLoadingComments}
        results={commentsPage?.results}
      />
    </>
  )
}

export default NegativeCommentsPage
