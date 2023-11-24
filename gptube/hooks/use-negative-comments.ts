import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { getVideoNegativeComments } from "@/services/get-video-negative-comments.service";
import {
  INITIAL_PAGE_VIDEOS_ANALYZED,
  PAGE_SIZE_VIDEOS_ANALYZED,
} from "@/constants/videos-analyzed.constants";
import { videoQueryKeys } from "./video-query-keys";
import { useAuth } from "./use-auth";

export function useNegativeComments(videoId: string) {
  const { user } = useAuth();
  const [page, setPage] = useState(INITIAL_PAGE_VIDEOS_ANALYZED);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_VIDEOS_ANALYZED);

  const query = useQuery({
    queryFn: () => getVideoNegativeComments({ userId: "1", videoId, page, pageSize }),
    queryKey: videoQueryKeys.videoNegativeComments({
      userId: "1",
      videoId,
      page,
      pageSize,
    }),
    enabled: user !== null,
    keepPreviousData: true,
  });

  const totalComments = query.data?.count ?? 0;
  const totalPages = totalComments / pageSize;

  useEffect(() => {
    if (query.error instanceof Error) {
      toast.error(query.error.message);
    }
  }, [query.error, query.isError]);

  const handleChangePage = (currentPage: number) => {
    setPage(+currentPage);
    // if (!query.data?.next) return

    // const { page: pageSearch, page_size } = extractSearchParamsVideo(query.data.next)

    // setPageSize(+page_size)
  };

  return {
    comments: query.data?.results,
    handleChangePage,
    totalPages,
    page,
    ...query,
  };
}
