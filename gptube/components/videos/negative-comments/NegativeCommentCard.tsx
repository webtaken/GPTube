/* eslint-disable @next/next/no-img-element */
import type { YoutubeComment } from '@/gptube-api'

import { ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Checkbox } from '@nextui-org/react'
import { MoreVertical } from 'lucide-react'

import { formatDate, formatDateRelative } from '@/utils/date.utils'

type NegativeCommentCardProps = YoutubeComment

export function NegativeCommentCard({ id, snippet }: NegativeCommentCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg shadow border">
      <Checkbox
        disabled
        classNames={{
          label: 'text-sm',
          icon: 'text-white',
        }}
        color="success"
        radius="sm"
        size="md"
        // onValueChange={value => {
        //   // TODO: send in the props a setter function to select specific actions over
        //   // a set of comments
        // }}
      />

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            alt={snippet?.authorDisplayName}
            className="w-10 h-10 rounded-full border"
            src={snippet?.authorProfileImageUrl}
          />
          <div>
            <p className="text-base font-medium truncate">{snippet?.authorDisplayName}</p>
            <p
              className="text-xs"
              title={formatDate(snippet?.publishedAt, 'DD MMM, YYYY (HH:mm A)')}
            >
              {formatDateRelative(snippet?.publishedAt)}
            </p>
          </div>
        </div>

        <p className="text-sm whitespace-pre-line">{snippet?.textOriginal}</p>

        <div className="flex items-center gap-4 mt-4">
          <p className="flex items-baseline gap-1 text-xs">
            <ThumbsUp className="w-3 h-3" /> {snippet?.likeCount || 0}
          </p>
          <ThumbsDown className="w-3 h-3" />
        </div>
      </div>
      <Dropdown>
        <DropdownTrigger>
          <MoreVertical className="w-5 h-5 rounded hover:cursor-pointer" strokeWidth={2} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant="light">
          <DropdownItem
            key="comment-link"
            href={`https://youtu.be/${snippet?.videoId}?lc=${id}`}
            startContent={<ExternalLink className="w-4 h-4" />}
            target="_blank"
          >
            Go to comment
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
