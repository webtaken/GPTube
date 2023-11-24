'use client'

import { useParams } from 'next/navigation'

import { useNegativeComments } from '@/hooks/use-negative-comments'
import { VideoTopActions } from '@/components/videos/VideoTopActions'
import { MainStatistics } from '@/components/videos/MainStatistics'

// TODO: Set this page as protected route for new users
function Video() {
  const { videoId } = useParams<{ videoId: string }>()!
  const {
    comments,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
    handleChangePage,
    page,
    totalPages,
    isFetching,
  } = useNegativeComments(videoId)

  console.log(comments)

  return (
    <main className="w-full h-screen max-w-screen-lg px-6 py-6 mx-auto space-y-6">
      <p>Negative comments</p>
    </main>
  )
}

export default Video
