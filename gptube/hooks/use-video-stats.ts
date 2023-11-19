import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getVideoStats } from "@/services/get-video-stats.service";

import { extractSearchParamsVideo } from "@/utils/video.utils";

import { videoQueryKeys } from "./video-query-keys";
import { useAuth } from "./use-auth";

export function useVideoStats(videoId: string) {
  const { user } = useAuth();

  const query = useQuery({
    queryFn: () => getVideoStats({ userId: "1", videoId: videoId }),
    queryKey: videoQueryKeys.videoStats({
      userId: "1",
      videoId: videoId,
    }),
    enabled: user !== null,
    staleTime: 5000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (query.error instanceof Error) {
      toast.error(query.error.message);
    }
  }, [query.error, query.isError]);

  return {
    videoData: query.data,
    ...query,
  };
}
