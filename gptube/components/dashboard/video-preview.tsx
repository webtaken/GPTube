import type { ModelsYoutubePreAnalyzerRespBody } from '@/gptube-api'

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  ScrollShadow,
  Skeleton,
} from '@nextui-org/react'
import { ThumbsDown, ThumbsUp, Video } from 'lucide-react'

export function VideoPreview({
  isLoading,
  isSuccess,
  video,
  isIdle,
}: {
  video: ModelsYoutubePreAnalyzerRespBody | undefined
  isLoading: boolean
  isSuccess: boolean
  isIdle: boolean
}) {
  return (
    <Card
      fullWidth
      className={`p-4 w-full h-full max-h-[400px] ${isIdle ? 'bg-gray-100' : ''}`}
      radius="sm"
      shadow="sm"
    >
      <ScrollShadow className="w-full h-full" offset={0} size={0}>
        {isLoading || isIdle ? (
          <VideoSkeleton showSkeleton={!isIdle} />
        ) : isSuccess && video ? (
          <>
            <CardHeader>
              <h3 className="text-lg font-semibold">{video.snippet?.title ?? ''}</h3>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Image
                alt={video.snippet?.title ?? ''}
                radius="none"
                src={video.snippet?.thumbnails?.standard?.url ?? ''}
              />
              <div className="flex items-center justify-between w-full gap-2 font-medium">
                <span className="text-black">{video.statistics?.viewCount} views</span>
                <section className="flex gap-1">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4" />
                    <span>{video.statistics?.likeCount}</span>
                  </div>
                  <div className="flex items-center gap-1 text-black">
                    <ThumbsDown className="w-4" />
                    <span>{video.statistics?.dislikeCount ?? 0}</span>
                  </div>
                </section>
              </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {video.snippet?.tags?.slice(0, 5).map(tag => {
                  return (
                    <Chip key={tag} className="whitespace-nowrap">
                      {tag}
                    </Chip>
                  )
                })}
                {video.snippet?.tags && video.snippet.tags.length > 5 ? (
                  <Chip>+{video.snippet.tags.length - 5}</Chip>
                ) : null}
              </div>
            </CardFooter>
          </>
        ) : null}
      </ScrollShadow>
    </Card>
  )
}

function VideoSkeleton({ showSkeleton }: { showSkeleton: boolean }) {
  return (
    <Card
      fullWidth
      className={`p-4 w-full h-full min-h-[400px] ${!showSkeleton ? 'bg-gray-100' : ''}`}
      radius="sm"
      shadow="sm"
    >
      <ScrollShadow className="w-full h-full" offset={0} size={0}>
        {showSkeleton ? (
          <div className="space-y-5 w-full h-full">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="w-3/5 h-3 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="w-4/5 h-3 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="w-2/5 h-3 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          </div>
        ) : (
          <div className="flex items-center flex-col gap-1 justify-center h-full w-full">
            <Video className="w-6 h-6 text-gray-500" />
            <span className="font-medium text-gray-500">No video selected</span>
          </div>
        )}
      </ScrollShadow>
    </Card>
  )
}
