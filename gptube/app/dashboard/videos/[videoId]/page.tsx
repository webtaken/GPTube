"use client";

import { useParams } from "next/navigation";

import { useVideoStats } from "@/hooks/use-video-stats";
import { VideoTopActions } from "@/components/videos/VideoTopActions";
import { MainStatistics } from "@/components/videos/MainStatistics";

// TODO: Set this page as protected route for new users
function Video() {
  const { videoId } = useParams<{ videoId: string }>()!;
  const { videoData, isLoading } = useVideoStats(videoId);

  return (
    <>
      <VideoTopActions
        createdAt={videoData?.createdAt}
        isLoading={isLoading}
        lastUpdate={videoData?.lastUpdate}
        snippet={videoData?.snippet}
        videoId={videoData?.videoId}
      />
      <MainStatistics isLoading={isLoading} results={videoData?.results} />
    </>
  );
}

export default Video;
