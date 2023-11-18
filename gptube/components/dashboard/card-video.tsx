/* eslint-disable @next/next/no-img-element */
import type { ModelsYoutubeVideoDashboard } from '@/gptube-api'

import { Avatar } from '@nextui-org/react'
import { Dot, MoreVertical } from 'lucide-react'

import { useAuth } from '@/hooks/use-auth'
import { formatDate } from '@/utils/date.utils'

import { Button } from '../Common/button'

export function CardVideo({ snippet, createdAt }: ModelsYoutubeVideoDashboard) {
  const { user } = useAuth()

  const { title, thumbnails, tags } = snippet ?? {}

  const imgCard = thumbnails?._default?.url

  return (
    <article className="flex items-center gap-4 p-4 border rounded-md shadow">
      <section>
        {imgCard ? (
          <img alt={title} className="object-cover object-center w-32 rounded" src={imgCard} />
        ) : null}
      </section>
      <section className="flex items-center justify-between gap-2">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{title}</h3>
          <div className="flex items-center">
            <Avatar showFallback className="w-5 h-5 text-tiny" src={user?.photoURL ?? undefined} />
            {createdAt ? (
              <>
                <Dot />
                <small>{formatDate(createdAt)}</small>
              </>
            ) : null}
          </div>
        </div>
        <div>
          <MoreVertical />
        </div>
      </section>
    </article>
  )
}
