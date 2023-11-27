import { Card, CardBody } from '@nextui-org/card'
import { Pagination, Spinner } from '@nextui-org/react'

import { useVideosAnalyzed } from '@/hooks/use-videos-analyzed'
import { DEFAULT_PAGE_PAGINATION } from '@/constants/general.constants'

import { FilterVideoAnalysis } from './filter-video-analysis'
import { ButtonNewAnalysis } from './button-new-analysis'
import { NotVideoFound } from './not-videos-found'
import { CardVideo } from './card-video'

export function DashboardUI() {
  const {
    count,
    videos,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
    handleChangePage,
    totalPages,
    isFetching,
  } = useVideosAnalyzed()

  return (
    <main className="max-w-screen-lg py-6 mx-auto space-y-6">
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
                      {videos?.map(video => <CardVideo key={video.videoId} {...video} />)}
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
                      cursor: 'text-white',
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
    </main>
  )
}
