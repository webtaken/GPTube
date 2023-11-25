/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoAnalyzed } from '@/gptube-api'

import Link from 'next/link'
import { Youtube } from 'lucide-react'
import { Skeleton } from '@nextui-org/react'

import { formatDateRelative, formatDate } from '@/utils/date.utils'

import { Button } from '../Common/button'

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
              <span className="font-medium" title={formatDate(createdAt, 'DD MMM, YYYY (HH:mm A)')}>
                {formatDateRelative(createdAt)}
              </span>
            </p>
            <p className="text-sm">
              Last update:{' '}
              <span
                className="font-medium"
                title={formatDate(lastUpdate, 'DD MMM, YYYY (HH:mm A)')}
              >
                {formatDateRelative(lastUpdate)}
              </span>
            </p>
          </>
        )}
      </section>
      {!isLoading && (
        <Link href={`/dashboard/videos/${videoId}/negative-comments`}>
          <Button className="text-sm font-medium bg-transparent border rounded-md shadow hover:shadow-lg">
            See negative comments
          </Button>
        </Link>
      )}
    </div>
  )
}
