import { Card, CardBody } from '@nextui-org/card'
import { Pagination, Spinner } from '@nextui-org/react'

import { useVideosAnalyzed } from '@/hooks/use-videos-analyzed'

import { FilterVideoAnalysis } from './filter-video-analysis'
import { ButtonNewAnalysis } from './button-new-analysis'
import { NotVideoFound } from './not-videos-found'
import { CardVideo } from './card-video'

export function DashboardUI() {
  const {
    videos,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
    handleChangePage,
    page,
    totalPages,
    isFetching,
  } = useVideosAnalyzed()

  return (
    <main className="max-w-screen-lg px-6 py-6 mx-auto space-y-6">
      <header className="flex justify-end">
        <ButtonNewAnalysis />
      </header>
      <section className="flex gap-10">
        <aside>
          <Card className="bg-white w-80" radius="sm" shadow="sm">
            <CardBody>
              <FilterVideoAnalysis />
            </CardBody>
          </Card>
        </aside>
        <aside className="flex-1">
          <Card className="min-h-[66.5dvh]" radius="sm">
            <CardBody className="space-y-6">
              <section>
                {isLoadingVideos ? (
                  <div className="flex">
                    <Spinner className="mx-auto" color="default" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {!videos || videos.length === 0 ? <NotVideoFound /> : null}
                    <section className="space-y-4">
                      {videos?.map(video => <CardVideo key={video.videoId} {...video} />)}
                    </section>
                  </div>
                )}
              </section>
              {videos != null && videos.length > 0 ? (
                <div className="flex justify-center">
                  <Pagination
                    color="success"
                    initialPage={page}
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
    </main>
  )
}
