"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Pagination, Spinner } from "@nextui-org/react";

import { useVideosAnalyzed } from "@/hooks/use-videos-analyzed";
import { DEFAULT_PAGE_PAGINATION } from "@/constants/general.constants";

import { FilterVideoAnalysis } from "@/components/dashboard/filter-video-analysis";
import { ButtonNewAnalysis } from "@/components/dashboard/button-new-analysis";
import { NotVideoFound } from "@/components/dashboard/not-videos-found";
import { CardVideo } from "@/components/dashboard/card-video";

export default function Dashboard() {
  const {
    count,
    videos,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
    handleChangePage,
    totalPages,
    isFetching,
  } = useVideosAnalyzed();

  return (
    <>
      <header className="flex justify-end">
        <ButtonNewAnalysis />
      </header>
      <section className="flex gap-10">
        <aside>
          <Card className="bg-white w-72" radius="sm" shadow="sm">
            <CardBody>
              <FilterVideoAnalysis />
            </CardBody>
          </Card>
        </aside>
        <aside className="flex-1">
          <Card radius="sm">
            <CardBody className="space-y-6">
              {isLoadingVideos || isFetching ? (
                <div className="flex justify-center">
                  <Spinner color="default" label="Loading videos..." />
                </div>
              ) : (
                <div className="px-4">
                  <p className="text-sm py-2 text-center">
                    Total videos analyzed are <span className="font-bold">{count || 0}</span>
                  </p>
                  <div className="space-y-2">
                    {!videos || videos.length === 0 ? <NotVideoFound /> : null}
                    <section className="space-y-4">
                      {videos?.map((video) => <CardVideo key={video.videoId} {...video} />)}
                    </section>
                  </div>
                </div>
              )}
              {videos != null && videos.length > 0 ? (
                <div className="flex justify-center">
                  <Pagination
                    isCompact
                    showControls
                    classNames={{
                      cursor: "text-white",
                    }}
                    color="success"
                    initialPage={DEFAULT_PAGE_PAGINATION}
                    isDisabled={isFetching || isErrorVideos}
                    total={totalPages}
                    onChange={handleChangePage}
                  />
                </div>
              ) : null}
            </CardBody>
          </Card>
        </aside>
      </section>
    </>
  );
}
