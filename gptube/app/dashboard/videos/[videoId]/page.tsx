'use client'

import { Spinner } from '@nextui-org/react'

import { useVideoStats } from '@/hooks/use-video-stats'
import { VideoTopActions } from '@/components/videos/VideoTopActions'
import { MainStatistics } from '@/components/videos/MainStatistics'
import { NotVideoFound } from '@/components/dashboard/not-videos-found'

// TODO: Set this page as protected route for new users
function VideoPage({ params }: { params: { videoId: string } }) {
  const { videoId } = params
  const { videoData, isLoading } = useVideoStats(videoId)

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner color="current" label="Loading stats" size="md" />
      </div>
    )
  }

  if (!videoData) return <NotVideoFound label="Stats not found" />

  return (
    <>
      <VideoTopActions
        createdAt={videoData.createdAt}
        lastUpdate={videoData.lastUpdate}
        snippet={videoData.snippet}
        videoId={videoData.videoId}
      />
      <MainStatistics results={videoData.results} />
    </>
  )
}

export default VideoPage
