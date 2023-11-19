"use client";

import { useParams } from "next/navigation";
import { useVideoStats } from "@/hooks/use-video-stats";
import { VideoTopActions } from "@/components/videos/VideoTopActions";
import { MainStatistics } from "@/components/videos/MainStatistics";

// TODO: Set this page as protected route for new users
function Video() {
  const params = useParams();
  const { videoId } = params;
  const { videoData } = useVideoStats(videoId);

  console.log(videoData);

  return (
    <>
      <main className="h-screen max-w-screen-lg w-full px-6 py-6 mx-auto space-y-6">
        <VideoTopActions
          snippet={videoData?.snippet}
          createdAt={videoData?.createdAt}
          lastUpdate={videoData?.lastUpdate}
          videoId={videoData?.videoId}
        />
        <MainStatistics results={videoData?.results} />
      </main>
    </>
  );
}

export default Video;
