/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from '@/gptube-api'

import { Youtube } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Tooltip, Skeleton } from '@nextui-org/react'

import { Button } from '../Common/button'

dayjs.extend(relativeTime)

interface VideoTopActionsProps extends ModelsYoutubeVideoAnalyzed {
  isLoading: boolean
}

export function VideoTopActions({
  snippet,
  createdAt,
  lastUpdate,
  videoId,
  isLoading,
}: VideoTopActionsProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <section>
        {isLoading ? (
          <div className="space-y-1">
            <Skeleton className="h-6 w-[400px] rounded-md" />
            <Skeleton className="h-4 w-[200px] rounded-md" />
            <Skeleton className="h-4 w-[200px] rounded-md" />
          </div>
        ) : (
          <>
            <a
              className="flex items-center gap-2 font-semibold text-ellipsis hover:underline"
              href={`https://youtu.be/${videoId}`}
              rel="noopener"
              target="_blank"
            >
              <Youtube className="w-5 h-5" />
              {snippet?.title}
            </a>
            <p className="text-sm">
              Created at:{' '}
              <Tooltip
                closeDelay={200}
                content={<p>{dayjs(createdAt).format('DD MMM, YYYY (HH:mm)')}</p>}
              >
                <span className="font-medium">{dayjs(createdAt).fromNow()}</span>
              </Tooltip>
            </p>
            <p className="text-sm">
              Last update:{' '}
              <Tooltip
                closeDelay={200}
                content={<p>{dayjs(lastUpdate).format('DD MMM, YYYY (HH:mm)')}</p>}
              >
                <span className="font-medium">{dayjs(lastUpdate).fromNow()}</span>
              </Tooltip>
            </p>
          </>
        )}
      </section>
      {!isLoading && (
        <section>
          <Button className="text-sm font-medium bg-transparent border rounded-md shadow hover:shadow-lg">
            See negative comments
          </Button>
        </section>
      )}
    </div>
  )
}
