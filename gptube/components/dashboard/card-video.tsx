/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoDashboard } from '@/gptube-api'

import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { Dot, MoreVertical, ExternalLink, BarChart3, Trash2, MessagesSquare } from 'lucide-react'

import { useAuth } from '@/hooks/use-auth'
import { formatDate } from '@/utils/date.utils'

export function CardVideo({ snippet, createdAt, videoId }: ModelsYoutubeVideoDashboard) {
  const { user } = useAuth()

  const { title, thumbnails } = snippet ?? {}

  const imgCard = thumbnails?._default?.url

  return (
    <article className="flex items-center gap-4 p-4 rounded-md shadow-sm border">
      <section>
        {imgCard ? (
          <img alt={title} className="object-cover object-center w-32 rounded" src={imgCard} />
        ) : null}
      </section>
      <section className="flex items-center justify-between w-full gap-2">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{title}</h3>
          <div className="flex items-center">
            <Avatar showFallback className="w-5 h-5 text-tiny" src={user?.photoURL ?? undefined} />
            {createdAt ? (
              <>
                <Dot />
                <small title={formatDate(createdAt, 'DD MMM, YYYY (HH:mm A)')}>
                  {formatDate(createdAt, 'MMM/DD')}
                </small>
              </>
            ) : null}
          </div>
        </div>
        <Dropdown className="relative">
          <DropdownTrigger>
            <MoreVertical className="w-5 h-5 rounded hover:cursor-pointer" strokeWidth={2} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" disabledKeys={['delete']} variant="light">
            <DropdownItem
              key="comment-link"
              href={`https://youtu.be/${videoId}`}
              startContent={<ExternalLink className="w-4 h-4" />}
              target="_blank"
            >
              Go to video
            </DropdownItem>
            <DropdownItem
              key="stats"
              href={`/dashboard/videos/${videoId}`}
              startContent={<BarChart3 className="w-4 h-4" />}
            >
              See Stats
            </DropdownItem>
            <DropdownItem
              key="negative-comments"
              href={`/dashboard/videos/${videoId}/negative-comments`}
              startContent={<MessagesSquare className="w-4 h-4" />}
            >
              Bad comments
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<Trash2 className="w-4 h-4" />}
            >
              Delete analysis
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </section>
    </article>
  )
}
